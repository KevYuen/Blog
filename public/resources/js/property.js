var property = {
	//url: "http://kevblog.aws.af.cm"
	url: "http://localhost:3000"
}

function loadDisqus(currentPageId) {
    // http://docs.disqus.com/help/2/
    window.disqus_shortname = 'dinocowblog';
    window.disqus_identifier = currentPageId;
    window.disqus_url = property.url + '/' + currentPageId;

    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] ||
        document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    angular.element(document.getElementById('disqus_thread')).html('');
 }