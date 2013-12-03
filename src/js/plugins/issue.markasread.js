/**
 * Attach mark as read to project issue tables.
 */
Drupal.behaviors.dreditorIssueMarkAsRead = {
  attach: function (context) {
    $('table.project-issue', context).once('dreditor-issuemarkasread', function () {
      $(this).find('.marker').addClass('clickable').bind('click.dreditor-markasread', function () {
        var $marker = $(this);
        var $link = $marker.prev('a');
        $.ajax({
          // The actual HTML page output is irrelevant, so denote that by using
          // the appropriate HTTP method.
          type: 'HEAD',
          url: $link.attr('href'),
          complete: function () {
            $marker.remove();
          }
        });
      });
    });
  }
};

/**
 * Attach mark ALL as read to project issue tables.
 */
Drupal.behaviors.dreditorMarkAllAsRead = {
  attach: function (context) {
    $('table.project-issue', context).once('dreditor-issuemarkallasread', function () {
      var $tmp = $('<a href="#" class="dreditor-mark-all-as-read">Mark ALL as read</a>');
      $tmp.click(function () {
        $('.marker').each(function () {
          var $marker = $(this);
          var $link = $marker.prev('a');
          $.ajax({
            // The actual HTML page output is irrelevant, so denote that by using
            // the appropriate HTTP method.
            type: 'HEAD',
            url: $link.attr('href'),
            complete: function () {
              $marker.remove();
            }
          });
        });
        // Refresh the page to get rid of all updated / x new markup.
        // TODO: this should happen after all requests from above are finished...
        //location.reload(true);
      });

      // Insert after the pager
      $('#feeds').after($tmp);
    });
  }
};
