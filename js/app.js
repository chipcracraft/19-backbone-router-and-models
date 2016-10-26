
var contentArea = document.querySelector(".content-area")


var BooksModel = Backbone.Model.extend ({

parse: function(rawJSON){
  return rawJSON.volumeInfo
}


})

var BookCollection = Backbone.Collection.extend({

      model: BooksModel,
      url: "",
      initialize: function(bSubCat) {
        this.url = "https://www.googleapis.com/books/v1/volumes?q=subject:"+bSubCat

      },
        parse: function(rawJSON){
          return rawJSON.items
        }
})

var AppRouter = Backbone.Router.extend({

        routes: {
            "books/:general/:sub-category" : "showSubcategory",
            "books/:general" : "showGenCategory",
            "" : "showHomePage"

        },


        showSubcategory: function(bookCat){

                var newSubCat = new BookCollection(bookSubs)
                newSubCat.fetch().then(function(){

                })

        },

        showGenCategory: function(bookCat){
            console.log(bookCat)

              var newCat = new BookCollection(bookCat)

                newCat.fetch().then(function(){
                  console.log(newCat.models)
                        var bigHTMLStr = ''
                  newCat.models.forEach(function(modelObj){
                    var mainBooks = modelObj.get('title')
                    var bookImg = modelObj.get('imageLinks')
                          if (bookImg.thumbnail ==="undefined") {
                              return '<img src="images/file-not-found.png">'
                          } else {
                              bookImg.thumbnail
                          }

                      console.log(mainBooks)
                            bigHTMLStr += '<div class="col-sm-3">'
                            bigHTMLStr += '<div class="thumbnail">'
                            bigHTMLStr += '<img src= "'+bookImg.thumbnail+'">'
                            bigHTMLStr += '<p>'+mainBooks+ '</p>'
                            bigHTMLStr += '</div>'
                            bigHTMLStr += '</div>'

                })
                document.querySelector('.content-area').innerHTML = bigHTMLStr

              })

        },


showHomePage: function(genBookInfo){
    var categoryListings = [
     {catName: "Fiction" , subcatList: ['Drama','Literature','Mystery', 'Poetry','Romance'] },
     {catName: "Nonfiction" ,   subcatList: ['Biography', 'Business', 'Education', 'Health', 'Philosophy', 'Self-Help'] },
     {catName: "Miscellaneous" ,   subcatList: ['Cooking','Crafts','Espanol', 'Medicine'] },
  ]
              var bigHTMLStr = ''
      categoryListings.forEach(function(obj){
              bigHTMLStr += '<div class="col-sm-4">'
              bigHTMLStr += '<h1>' + obj.catName + '</h1>'
              bigHTMLStr += '<ul>'
          for(var i = 0; i < obj.subcatList.length; i++){
              bigHTMLStr += '<li>' +obj.subcatList[i] + '</li>'
          }
              bigHTMLStr +=  '</ul>'
              bigHTMLStr += '</div>'
      })
      document.querySelector('.content-area').innerHTML = bigHTMLStr

},



  initialize: function(){
  Backbone.history.start()
  },
})

var myApp = new AppRouter()
