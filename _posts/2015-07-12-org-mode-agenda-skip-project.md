---
layout: post
title: Speeding up Org-Mode Agenda Skip Project with Local Variables
date: 2015-07-12
tags: script org-mode emacs
---

I had built an org-mode agenda function that looked through one org file that was filled with projects I was tracking and then filtering an org-mode agenda based upon the state of those projects.

<!--more-->

Every task in my agenda file is linked to a project using a category.  When I added this function to my agenda originally I added an skip function that iterated through the my projects file to find applicable projects. This caused my agenda's to move incredibly slow. The slow code looked like this.

{% highlight elisp %}
  ;; First I created a custom agenda command that used the skip function
    (setq org-agenda-custom-commands
          '(("a"
             "Agenda Function That Runs REALLY SLOWLY"
             ((agenda ""
                      ((org-agenda-skip-function 'org-project-SLOW-skip-function)))
              nil))))

  ;;here is our SLOW function
    (defun org-project-SLOW-skip-function ()
      "SLOOOOOOWLY skip tasks that have the same category as personal projects."
      (let
          ;; Here is where I use org-map-entries to iterate over all my projects to find personal projects
          ;; It creates a list of categories that match
          ;; If you have not played with org-map-entries you really should.
          ((skip-project (org-map-entries '(org-entry-get (point) "CATEGORY")
                                          "+PERSONAL=\"y\""
                                          (list org-project-project-file)))
           ;;This is just for passing the location to continue from to the skip function
           (subtree-end (save-excursion (org-end-of-subtree t))))
        (if (org-project-entry-is-project-category skip-project)
            subtree-end
          nil)))

    (defun org-project-entry-is-project-category (project-categories)
      "Returns t if an entry at current point has a category that is in list project-categories"
      (let ((current-category (org-entry-get (point) "CATEGORY")))
        (if (member current-category project-categories)
            t
          nil)))
{% endhighlight %}

Org agenda custom commands set all the variables under them using **let**. All the agenda functions run will be able to use this local scope when they run. This means that instead of calling my **org-map-entries** function on every run, I can just do it once and set it to a variable that my later agenda commands will reference. Here it is again with the function run only once.

{% highlight elisp %}
  (setq org-agenda-custom-commands
        '(("a"
           "Agenda Function using the scope to speed it up"
           ((agenda ""
                    ;;This skip-project variable gets project categories marked as personal
                    ;; It is used by the org-agenda-skip-function below
                    ((skip-project (org-map-entries '(org-entry-get (point) "CATEGORY") "+PERSONAL=\"y\"" (list org-project-project-file)))
                     (org-agenda-skip-function 'org-project-skip-project)))
            nil))))
{% endhighlight %}

{% highlight elisp %}
  (defun org-project-skip-project ()
    "Skip trees that are not waiting"
    (let ((subtree-end (save-excursion (org-end-of-subtree t))))
      ;;You need to have set a "skip-project" variable in your custom agenda block
      (if (org-project-entry-is-project-category skip-project)
          (org-end-of-subtree t)
        nil)))

  (defun org-project-entry-is-project-category (project-categories)
    "An entry at current point is a member of project-categories"
    (let ((current-category (org-entry-get (point) "CATEGORY")))
      (if (member current-category project-categories)
          t
        nil)))
{% endhighlight %}

This also means that I can re-use **org-project-skip-project** with different **skip-project** lists set. As a final note; much of this can be applied to pre-existing skip functions. I am excited to explore what kind of interesting things I can "break" by re-assigning global variables and functions when creating agendas.
