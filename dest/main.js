// Fading content
function fadingContent() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show")
            } else {
                entry.target.classList.remove("show")
            }
        })
    })
    const fade = document.querySelectorAll(".fade")
    fade.forEach(el => observer.observe(el))
}
fadingContent()

// Header bg
function headerChange() {
    const header = document.querySelector(".header")
    upDown = window.scrollY
    if (upDown > header.clientHeight) {
        header.classList.add("change")
    } else header.classList.remove("change")

}
window.addEventListener("scroll", headerChange)

// Progress
function progress() {
    let progress = document.querySelector(".progress")
    window.addEventListener("scroll", function () {
        let yAxis = window.scrollY
        let percentage = yAxis / (document.body.offsetHeight - window.innerHeight) * 100
        progress.style.width = `${percentage}%`
    })
}
progress()

// Loading
function loading() {
    let body = document.querySelector("body"),
        load = document.querySelector(".loading"),
        process = document.querySelector(".loading__bars div"),
        percentage = document.querySelector(".loading__percentage"),
        start = 0

    setInterval(function () {
        if (start < 100) {
            start++;
            process.style.width = `${start}%`
            percentage.textContent = `${start}%`
        } else {
            setTimeout(function () {
                load.classList.add("completed")
                body.classList.remove("disable-scroll")
            })
        }
    })
}
loading()

// Hambur change
function hambur() {
    const btn = document.querySelector(".header__hambur"),
        mNav = document.querySelector(".mobile-menu")

    btn.addEventListener("click", function () {
        this.classList.toggle("active")
        mNav.classList.toggle("active")
    })
    function visibility() {
        btn.classList.remove("active")
        mNav.classList.remove("active")
    }
    window.addEventListener("resize", function () {
        if (window.innerWidth > 992) {
            visibility()
        }
    })
}
hambur()

// Pop vid
function popVideo() {
    let videos = document.querySelectorAll(".started .started__video .play-frame"),
        modalVideo = document.querySelector(".p-video"),
        iframeModal = document.querySelector(".p-video .p-video__inner .p-video__inner--iframe iframe"),
        btn = document.querySelector(".p-video .p-video__inner .p-video__inner--close"),
        popVidCheck = document.querySelector(".started__video");
    if (document.contains(popVidCheck) == true) {
        videos.forEach(function (video) {
            video.addEventListener("click", function () {
                // Show modal
                modalVideo.classList.add("active")

                // get video source
                let data = video.getAttribute("data-video-src")
                iframeModal.setAttribute("src", `https://www.youtube.com/embed/${data}?autoplay=1`)
            })
        })
        // Close video
        function closeModal() {
            modalVideo.classList.remove("active")

            // Empty the video's source => no sound
            iframeModal.setAttribute("src", "")
        }
        btn.addEventListener("click", function () {
            closeModal()
        })
        modalVideo.addEventListener("click", function () {
            closeModal()
        })
    }
}
popVideo()

// Tab select
function select() {
    let currentTag = document.querySelectorAll(".post .post__options .tag"),
        currentPost = document.querySelectorAll(".post__article"),
        postsc = document.querySelector(".post")
    if (document.contains(postsc) == true) {
        currentTag.forEach(function (tag) {
            tag.addEventListener("click", function () {

                // Remove active class from other tabs
                currentTag.forEach(function (tag) {
                    tag.classList.remove("active")
                })

                // Add active class to selected tabs
                this.classList.add("active")

                // Hide the unselected post
                currentPost.forEach(function (post) {
                    post.classList.remove("active")
                })

                // Get data-tab
                let id = this.dataset.option

                // Display the selected post
                document.querySelector(".post__article-" + id).classList.add("active")
            })
        })
    }
}
select()

// Header's menu current page
function activeMenu() {
    let currentPage = document.querySelectorAll(".header .header__menu li a"),
        currentPageM = document.querySelectorAll(".mobile-menu li a"),
        blog = document.getElementById("blog"),
        blogM = document.getElementById("blogm"),
        index = document.getElementById("index"),
        indexm = document.getElementById("indexm"),
        arr = (document.location.pathname).split("."),
        splitID = arr[0].replace("/", "")

    currentPage.forEach(function (cValue) {
        if (cValue.id == splitID) {
            cValue.classList.add("active")
        } else {
            cValue.classList.remove("active")
        }
        if (splitID == "blog-detail") {
            blog.classList.add("active")
        }
        if (document.location.pathname == "/") {
            index.classList.add("active")
        }

    })

    currentPageM.forEach(function (cValue) {
        if (cValue.id == splitID) {
            cValue.classList.add("active")
        } else {
            cValue.classList.remove("active")
        }
        if (splitID == "blog-detail") {
            blogM.classList.add("active")
        }
        if (document.location.pathname == "/") {
            indexm.classList.add("active")
        }
    })
    console.log(document.location)
    console.log(document.location.pathname)
    console.log(splitID)
}
activeMenu()

// FAQs
function accordion() {
    let acc = document.getElementsByClassName("accordion")
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px"
            }
        });
    }
}
accordion()

// Blog slider nav
function blogNav() {
    let blogNavCheck = document.querySelector(".post__article-1 .post__wrapper")

    if (document.contains(blogNavCheck) == true) {
        const prevBtn = document.getElementById('prevBtn')
        const nextBtn = document.getElementById('nextBtn')
        const pages = document.querySelectorAll('.button-row .button-group .button')

        let currentPage = 1
        updatePageState()

        prevBtn.addEventListener('click', goToPreviousPage);
        nextBtn.addEventListener('click', goToNextPage);

        function updatePageState() {
            if (currentPage === 1) {
                prevBtn.classList.add('disable')
            } else {
                prevBtn.classList.remove('disable')
            }

            if (currentPage === pages.length) {
                nextBtn.classList.add('disable')
            } else {
                nextBtn.classList.remove('disable')
            }

            pages.forEach((page, index) => {
                if (index + 1 === currentPage) {
                    page.classList.add('active')
                } else {
                    page.classList.remove('active')
                }
            });
        }

        function goToPreviousPage() {
            if (currentPage > 1) {
                currentPage--
                updatePageState()
            }
        }

        function goToNextPage() {
            if (currentPage < pages.length) {
                currentPage++
                updatePageState()
            }
        }
    }
}
blogNav()

// Contact form
function formCheck() {
    let contact = document.querySelector(".contact")

    if (document.contains(contact) == true) {
        const form = document.getElementById("form-contact")
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const subject = document.getElementById("subject")
        const message = document.getElementById("message")

        // Show error
        function showError(input, message) {
            const formControl = input.parentElement
            formControl.className = "form-group error"
            const msg = formControl.querySelector(".form-message")
            msg.innerText = message
        }

        // Show success
        function showSuccess(input) {
            const formControl = input.parentElement
            formControl.className = "form-group success"
        }

        // Check email pattern
        function checkEmail(input) {
            const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (regexp.test(input.value.trim())) {
                showSuccess(input)
            } else {
                showError(input, 'Invalid email');
            }
        }

        // Check req field
        function checkRequired(inputArr) {
            inputArr.forEach(function (input) {
                if (input.value.trim() === '') {
                    showError(input)
                } else {
                    showSuccess(input);
                }
            });
        }

        // Check input length
        function checkLength(input, min) {
            if (input.value.length < min) {
                showError(input, `Please fill in this field`);
            } else {
                showSuccess(input);
            }
        }
        // Check on submit
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            checkRequired([name, email, subject, message]);
            checkLength(name, 1);
            checkEmail(email);
            checkLength(subject, 1);
            checkLength(message, 1);
        });
    }
}
formCheck()

// Blog form
function blogForm() {
    const blogForm = document.getElementById("blog-form")
    const email = document.getElementById("blogEmail")
    if (document.contains(blogForm) == true) {

        // Show error
        function showError(input, message) {
            const formControl = input.parentElement
            formControl.className = "form-group error"
            const msg = formControl.querySelector(".form-message")
            msg.innerText = message
        }

        function showSuccess(input, message) {
            const formControl = input.parentElement
            formControl.className = "form-group success"
            const msg = formControl.querySelector(".form-message")
            msg.innerText = message
        }

        // Show success
        function checkEmail(input) {
            const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (regexp.test(input.value.trim())) {
                showSuccess(input, 'Valid email')
            } else {
                showError(input, 'Invalid email');
            }
        }

        // Check req field
        function checkRequired(inputArr) {
            inputArr.forEach(function (input) {
                if (input.value.trim() === '') {
                    showError(input)
                } else {
                    showSuccess(input);
                }
            });
        }

        // Check on submit
        blogForm.addEventListener('submit', function (e) {
            e.preventDefault();

            checkRequired([email]);
            checkEmail(email);
        });
    }
}
blogForm()


function libCheck() {
    let slider = document.querySelector(".users__wrapper");
    if (document.contains(slider) == true) {
        let userSlider = new FlickityResponsive(slider, {
            // options
            cellAlign: 'center',
            contain: true,
            prevNextButtons: false,
            wrapAround: true,
            groupCells: 2,
            on: {
                ready: function () {
                    flickWidth();
                    flickHeight();
                },
                resize: function () {
                    flickHeight();
                },
            },
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        groupCells: 1,
                    },
                },
            ],
        });
    }

    function getStyle(oElm, strCssRule) {
        var strValue = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
            strValue = document.defaultView
                .getComputedStyle(oElm, "")
                .getPropertyValue(strCssRule);
        } else if (oElm.currentStyle) {
            strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
                return p1.toUpperCase();
            });
            strValue = oElm.currentStyle[strCssRule];
        }
        return strValue.replace("px", "");
    }

    function flickWidth() {
        let contW = document.querySelector(
            ".users .container"
        ).clientWidth,
            items = document.querySelectorAll(".users .users__wrapper .users__item"),
            gridGap = 26;
        if (document.documentElement.offsetWidth >= 768) {
            items.forEach((item) => {
                item.style.width = `${contW / 2 - gridGap / 2}px`;
            });
        } else {
            items.forEach((item) => {
                item.style.width = `${contW}px`;
            });
        }
    }

    function flickHeight() {
        const items = document.querySelectorAll(".users .users__wrapper .users__item");
        let height = 0;
        items.forEach((item) => {
            let heightItem =
                item.querySelector(".textbox").scrollHeight +
                item.querySelector(".user").scrollHeight +
                parseInt(getStyle(item.querySelector(".user"), "margin-top")) +
                parseInt(getStyle(item, "padding-top")) * 2;
            if (heightItem > height) {
                height = heightItem;
            }
        });
        items.forEach((item) => {
            item.style.height = height + "px";
        });
        document.querySelector(".users .users__wrapper .flickity-viewport").style.height =
            height + "px";
    }

    // Blog
    let blogSlider = document.querySelector(".post__wrapper")
    if (document.contains(blogSlider) == true) {
        let utils = window.fizzyUIUtils,
            postSlider = new Flickity(blogSlider, {
                // options
                cellAlign: 'center',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: false,
            });

        let cellsButtonGroup = document.querySelector('.button-group--cells');
        let cellsButtons = utils.makeArray(cellsButtonGroup.children);

        // update buttons on select
        postSlider.on('select', function () {
            let previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
            let selectedButton = cellsButtonGroup.children[postSlider.selectedIndex];
            previousSelectedButton.classList.remove('is-selected');
            selectedButton.classList.add('is-selected');
        });

        // cell select
        cellsButtonGroup.addEventListener('click', function (event) {
            if (!matchesSelector(event.target, '.button')) {
                return;
            }
            let index = cellsButtons.indexOf(event.target);
            postSlider.select(index);
        });

        // previous
        let previousButton = document.querySelector('.button--previous');
        previousButton.addEventListener('click', function () {
            postSlider.previous();
        });

        // next
        let nextButton = document.querySelector('.button--next');
        nextButton.addEventListener('click', function () {
            postSlider.next();
        });
    }
}
libCheck()





