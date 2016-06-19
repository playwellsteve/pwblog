var docpadConfig = {
	documentPaths: ['render/pwblog/posts'],

	templateData: {
		site: {
			url: "http://play-well.org/pwblog",
			title: "Play-Well TEKnologies Blog",
			subtitle: "Teaching Engineering to Kids",
			author: "Play-Well TEKnologies",
			description: "We blog about anything that we think is cool.",
			keywords: "blog, our, cool"
		},
		getPreparedTitle: function() {
			if(this.document.title) {
				return this.document.title + " | " + this.site.title;
			} else {
				return this.site.title;
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.site.description;
		},
		getPreparedKeywords: function() {
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		},
		getTagString: function() {
			if(this.document.tags) {
				return this.document.tags.toString();
			} else {
				return "No Tags";
			}
		}
	},

	collections: {
		posts: function() {
			var documents = this.getCollection("documents");
			var sortByDescendingDate = [{ date: -1}];
			var typeEqualsPost = { type: {$eq: "post"}};

			var postList = documents.findAllLive(typeEqualsPost, sortByDescendingDate);

			postList.on("add", function(model){
				model.setMetaDefaults({layout: "post"});
			})

			return postList;
		}
	},
	plugins: {
		
		rss: {
			default: {
				collection: 'posts',
				url: '/rss.xml'
			}
		},
		tags: {
			extension: '.html.eco',
			injectDocumentHelper: function(doc) {
				doc.setMeta({
					layout: 'default',
					type: 'page',
					date: '2016-05-01',
					data: "<%- this.partial('content/tag', this) %>"
				})
			}
		}
	}
};

module.exports = docpadConfig;