let vm = new Vue({
    el: '#books',
    data: {
        books: [],
        search: '',
        footer: false
    },
    methods: {
        fetchData() {
            fetch('https://api.myjson.com/bins/udbm5')
                .then(res => res.json())
                .then(data => {
                    this.books = data.books;
                })
                .catch(err => console.log(err))
        },
        searchedBooks() {
            let str = this.search;
            return this.books.filter(function (book) {
                if (book.titulo.match(str) || book.descripcion.match(str) || book.idioma.match(str)) return true;
            })
        },
        nullResult() {
            let result = this.filteredBooks;
            if (result.length === 0) {
                this.footer = true;
            } else {
                this.footer = false;
            }
        }
    },
    computed: {
        filteredBooks() {
            let results = this.searchedBooks();
            results.forEach(function (each) {
                if (results.indexOf(each) === 0) {
                    each.carousel_class = 'carousel-item active'
                } else {
                    each.carousel_class = 'carousel-item'
                }
            });
            return results
        }
    },
    mounted() {
        this.fetchData();
    }
})
