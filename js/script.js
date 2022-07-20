window.addEventListener('load', function () {
    let nav = document.querySelector('.header__nav'),
        navBtn = document.querySelector('.header__nav-open');

    document.body.addEventListener('click', function (e) {
        let target = e.target;

        if (target.closest('.header__nav-open')) {
            e.preventDefault();
            nav.classList.toggle('active');
            navBtn.classList.toggle('active');
            return;
        }

        nav.classList.remove('active');
        navBtn.classList.remove('active');


    });

    let popup = document.querySelector('.popup'),
        form = document.querySelector('.form'),
        btnOpenForm = document.querySelector('[data-action="openForm"]');

    btnOpenForm.addEventListener('click', function (e) {
        e.preventDefault();
        popup.classList.add('active');
    });

    popup.addEventListener('click', function (e) {
        let target = e.target;

        if (!target.closest('.form') || target.closest('.form__close')) {
            popup.classList.remove('active');
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        sendFeedData(this);
    });

    function sendFeedData(form) {
        let data = $(form).serialize();

        $.ajax({
            dataType: "json",
            type: "POST",
            url: '/php/ajax.php',
            data: data,
            success: function (result) {
                if (result.status) {
                    form.classList.add('sended');
                } else {
                    alert('Что-то пошло не так, попробуйте еще раз!!!');
                }
            },
            error: function (result) {
                alert('Что-то пошло не так, попробуйте еще раз!!!');
            }
        });
    }

});