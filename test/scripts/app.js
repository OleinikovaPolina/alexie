"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var headElem = document.getElementById("head");
var buttonsElem = document.getElementById("buttons");
var pagesElem = document.getElementById("pages"); //Класс, который представляет сам тест

var Quiz = /*#__PURE__*/function () {
  function Quiz(type, questions, results) {
    _classCallCheck(this, Quiz);

    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type; //Массив с вопросами

    this.questions = questions; //Массив с возможными результатами

    this.results = results; //Количество набранных очков

    this.score = 0; //Номер результата из массива

    this.result = 0; //Номер текущего вопроса

    this.current = 0;
  }

  _createClass(Quiz, [{
    key: "Click",
    value: function Click(index) {
      //Добавляем очки
      var value = this.questions[this.current].Click(index);
      this.score += value;
      var correct = -1; //Если было добавлено хотя одно очко, то считаем, что ответ верный

      if (value >= 1) {
        correct = index;
      } else {
        //Иначе ищем, какой ответ может быть правильным
        for (var i = 0; i < this.questions[this.current].answers.length; i++) {
          if (this.questions[this.current].answers[i].value >= 1) {
            correct = i;
            break;
          }
        }
      }

      this.Next();
      return correct;
    } //Переход к следующему вопросу

  }, {
    key: "Next",
    value: function Next() {
      this.current++;

      if (this.current >= this.questions.length) {
        this.End();
      }
    } //Если вопросы кончились, этот метод проверит, какой результат получил пользователь

  }, {
    key: "End",
    value: function End() {
      for (var i = 0; i < this.results.length; i++) {
        if (this.results[i].Check(this.score)) {
          this.result = i;
        }
      }
    }
  }]);

  return Quiz;
}(); //Класс, представляющий вопрос


var Question = /*#__PURE__*/function () {
  function Question(text, answers) {
    _classCallCheck(this, Question);

    this.text = text;
    this.answers = answers;
  }

  _createClass(Question, [{
    key: "Click",
    value: function Click(index) {
      if (this.answers[index].answ != '') {
        $('.answ p').text(this.answers[index].answ);
      }

      if (this.answers[index].answ2 != '') {
        $('.answ a:first-of-type').attr('href', this.answers[index].answ2);
        $('.answ a:first-of-type').removeClass('d-none');

        if (this.answers[index].value == 1) {
          $('.answ').addClass('correct');
        }
      }

      if (this.answers[index].answ3 != '') {
        $('.answ a:last-of-type').attr('href', this.answers[index].answ3);
        $('.answ a:last-of-type').removeClass('d-none');
      }

      return this.answers[index].value;
    }
  }]);

  return Question;
}(); //Класс, представляющий ответ


var Answer = function Answer(text, value) {
  var answ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var answ2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var answ3 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  _classCallCheck(this, Answer);

  this.text = text;
  this.value = value;
  this.answ = answ;
  this.answ2 = answ2;
  this.answ3 = answ3;
}; //Класс, представляющий результат


var Result = /*#__PURE__*/function () {
  function Result(text, value, img) {
    _classCallCheck(this, Result);

    this.text = text;
    this.value = value;
    this.img = img;
  } //Этот метод проверяет, достаточно ли очков набрал пользователь


  _createClass(Result, [{
    key: "Check",
    value: function Check(value) {
      if (this.value <= value) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Result;
}(); //Массив с результатами


var results = [new Result("Ничего страшного – Русь тоже не сразу смогла побороть монголо-татарское иго. Чтобы начать знакомство с князем Александром и историей Древней Руси, рекомендуем побродить по разным разделам нашего портала, чтобы в этом убедиться. И, конечно, посмотреть видео-мэппинг <a href='./vr.html' class='reslink' target='_blank'>«Александр Невский VR»</a> из дома или прямо на <a class='reslink' href='./vr.html' target='_blank'>Дворцовой площади</a>. Это уже просто для удовольствия.", 0, './img/test/Rectangle 103 (2).png'), new Result("Весьма неплохой результат! Однако в истории Древней Руси еще осталось немало интересного – рекомендуем побродить по разным разделам нашего портала, чтобы в этом убедиться. И, конечно, посмотреть видео-мэппинг <a href='./vr.html' target='_blank' class='reslink'>«Александр Невский VR»</a> из дома или прямо на <a href='./vr.html' target='_blank' class='reslink'>Дворцовой площади</a>. Это уже просто для удовольствия.", 5, './img/test/Rectangle 103 (1).png'), new Result("Поздравляем! Вы отлично разбираетесь в истории Древней Руси! Однако чтобы убедиться, что за скобками не остались любопытные подробности, рекомендуем побродить по разным разделам нашего портала – и, конечно, посмотреть видео-мэппинг <a href='./vr.html' target='_blank' class='reslink'>«Александр Невский VR»</a> из дома или прямо на <a class='reslink' href='./vr.html' target='_blank'>Дворцовой площади</a>. Это уже просто для удовольствия.", 8, './img/test/Rectangle 103.png')]; //Массив с вопросами

var questions = [new Question("Князь Александр звался Ярославичем потому, что:", [new Answer("родился в Ярославле", 0, 'увы, неверно: князь Александр родился в Переславле-Залесском, на берегу Плещеева озера', './timeline.html'), new Answer("принадлежал к княжеской династии Ярославичей", 0, 'неверно: князь Александр принадлежал к династии Рюриковичей, о которой подробнее можно прочитать здесь', './drevo.html'), new Answer("был сыном Ярослава", 1, 'да! Александр был вторым сыном князя Переславль-Залесского Ярослава Всеволодовича', './timeline.html')]), new Question("Родным прадедом Александру приходился:", [new Answer("Андрей Боголюбский", 0, 'не родным прадедом, а двоюродным дедом: собственно, если бы у правящего князя Андрея Боголюбского были взрослые сыновья, его брат Всеволод Большое Гнездо не унаследовал бы Владимирский престол, не стал бы Великим князем Киевским и не передал бы стержневую нить наследования ни своему сыну Ярославу, ни своему внуку Александру', './drevo.html'), new Answer("Юрий Долгорукий", 1, 'да, именно этот энергичный и предприимчивый князь приходится Александру родным прадедом – кстати, Москву он все-таки вряд ли основал, просто при нем она впервые упоминается в летописях', './drevo.html'), new Answer("Ярослав Мудрый", 0, 'нет, князь Ярослав Владимирович, хоть и прямая родня Александру, но не отец и даже не прадед: их разделяют почти два с половиной столетия', './drevo.html')]), new Question("В каком году произошла Невская битва?", [new Answer("1237", 0, 'к сожалению, этот год принес Руси не яркую победу, а катастрофу: первое нашествие орд хана Батыя', './politician.html#Mongols'), new Answer("1240", 1, 'да! Битва случилась в разгар летних покосов, 15 июля 1240 года', './nevskaya.html'), new Answer("1242", 0, 'этот год тоже запомнился крупной битвой, но не Невской, а Ледовым побоищем', './ledovoe.html')]), new Question("Кому из русских святых князей Александр Ярославич обязан помощью?", [new Answer("Святой равноапостольной княгине Ольге ", 0, 'достоверно утверждать, конечно, ничего нельзя, но в летописях таких фактов не зафиксировано'), new Answer("Святому великому князю Владимиру ", 0, 'на этот счет летописи ничего не упоминают, но примечательно, что и Владимир, и Александр начинали свое княжение в Новгороде, а затем оба стали Великими князьями Киевскими – правда, при совершенно разных обстоятельствах', './drevo.html'), new Answer("Святым благоверным князьям Борису и Глебу ", 1, 'автор «Жития» приводит очень одухотворенное описание явления святых Бориса и Глеба воеводе Пелугию накануне Невской битвы с обещанием небесной поддержки и покровительства – как известно, юный Александр блестяще выиграет эту битву', './life.html')]), new Question("Когда князь Александр Ярославич получил прозвище «Невский»?", [new Answer("наутро после Невской битвы", 0, 'в древнейших летописях князь Александр (Олександр) упоминается с эпитетами вроде «великий» и даже «грозный», но не «Невский»', './life.html'), new Answer("в XV веке", 1, 'да, впервые прозвище «Невский» упоминается в тексте, созданном в начале XV века и отсылавшем к его первому крупному сражению и первой победе. В итоге оно и закрепилось, хотя даже в XVI веке, при Иване Грозном, князя еще называли и иначе — «Храбрым»'), new Answer("в ХХ веке благодаря фильму Сергея Эйзентшейна", 0, 'благодаря гению режиссера Эйзенштейна, таланту сценариста Павленко и харизме артиста Черкасова фильм «Александр Невский» сформировал невероятно мощный и живой образ князя, подарив нам не только героя, но и многие знаковые для российского менталитета фразы. Однако «Невским» князь Александр стал гораздо раньше')]), new Question("Кто такие «ливонцы»?", [new Answer("литовцы", 0, 'Ливония, как и земли литовцев, располагается в Прибалтике, но это совсем не синонимы', './ledovoe.html#Livonians'), new Answer("ливанцы", 0, 'ой, нет, они и жили, и живут совсем далеко – даже не в Европе – и пойти войной на Новгород ну никак не могли'), new Answer("немцы", 1, 'да! Ливонцы, или рыцари Ливонского ордена, на самом деле – немецкие воины-крестоносцы, в период княжения Александра обосновавшиеся в Ливонии – одной из областей Прибалтики')]), new Question("Какое высказывание действительно принадлежит Александру Невскому?", [new Answer("«На том стояла и стоять будет Земля Русская»", 0, 'нет, эта фраза – образ художественный: впервые она прозвучала в фильме Сергея Эйзенштейна «Александр Невский» из уст Николая Черкасова, исполнившего роль молодого князя'), new Answer("«Не в силе Бог, а в Правде»", 1, 'да, автор «Жития» Александра Невского, который был, по всей вероятности, младшим современником князя, цитирует эту фразу как услышанную ратниками от Александра накануне Невской битвы', './life.html'), new Answer("«Кто с мечом к нам придет, тот от меча и погибнет»", 0, 'этот лозунг, ставший в свое время практически девизом советских войск, принадлежит не князю Александру, а Петру Павленко, писателю и автору сценария фильма Сергея Эйзенштейна «Александр Невский»')]), new Question("Что такое «бармица»?", [new Answer("наносник на шлеме воина", 0, 'нет, наносник иного названия не имел', './laty.html'), new Answer("кольчуга с длинными рукавами и капюшоном", 0, 'нет, так выглядит хауберк – непременный атрибут тяжеловооруженного европейского рыцаря в XIII веке', './laty.html'), new Answer("кольчужный подвес под шлемом", 1, 'верно, это кольчужная защита шеи воина, крепившаяся к нижнему краю шлема', './laty.html')]), new Question("В каких землях, кроме русских, довелось побывать князю Александру?", [new Answer("монгольских и литовских", 1, 'именно! Хотя и с совершенно разными целями: если в литовские земли князь отправился с карательным походом, чтобы прекратить вековые грабительские набеги литовских отрядов на Русь, то в ордынский Каракорум Александр Ярославич ездил с переговорными, то есть дипломатическими миссиями, причем целых четыре раза', './politician.html'), new Answer("римских и шведских", 0, 'нет, сам Александр не ступал на земли ни шведские, ни папские, а вот обратное вполне верно: шведы направили на Новгород войско, что закончилось для них весьма плачевно – Невской битвой, а позднее Папа римский Иннокентий IV направил к Александру послов с неординарным предложением', './politician.html#Rome', './nevskaya.html'), new Answer("на Дальнем Востоке", 0, 'ой, нет, таких сведений в летописях не сохранилось')]), new Question("В каком возрасте непобедимый князь Александр выиграл свою первую битву?", [new Answer("около 20", 1, 'да, около 20. Существуют разночтения насчет года рождения князя – называют и 1219, и 1220, и 1221 – но точная дата битвы известна: 15 июля 1240 года. Следовательно, Александру, наголову разбившему «с малой дружиной» полноценное войско шведов на реке Неве, могло быть от 19 лет до 21 года', './nevskaya.html'), new Answer("около 30", 0, 'первым его самостоятельным сражением и первой же блестящей победой стала Невская битва 1240 года, а к 30 годам князь Александр уже обрел славу великую и повсеместную. Например, в 1256 году шведские войска планировали новый поход на Русь, но узнав, что противостоять им будет сам Александр Ярославич, сочли за лучшее уйти восвояси – и Александр «выиграл битву без сражения»', './timeline.html'), new Answer("около 40", 0, 'около 40, в 1263 году, Великий князь Киевский, Великий князь Владимирский, Великий князь Переяславль-Залесский Александр Ярославич скончался в городе Городце, на пути из своего последнего путешествия в Орду – и началась совсем другая его история: небесного покровителя и вдохновителя Руси, Российской Империи, Российской Федерации – России')])]; //Сам тест

var quiz = new Quiz(1, questions, results);
Update(); //Обновление теста

function Update() {
  $('.nextbtn').addClass('d-none');
  $('.answ').addClass('d-none');
  $('.answ').removeClass('correct');
  $('.answ a').addClass('d-none'); //Проверяем, есть ли ещё вопросы

  if (quiz.current < quiz.questions.length) {
    //Если есть, меняем вопрос в заголовке
    headElem.innerHTML = '<p>' + quiz.questions[quiz.current].text + '</p>'; //Удаляем старые варианты ответов

    buttonsElem.innerHTML = ""; //Создаём кнопки для новых вариантов ответов

    for (var i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      // my
      var btn = document.createElement("div");
      btn.className = "form-check button";
      btn.innerHTML = "<input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\"\n\t\tid=\"in".concat(i, "\" >\n\t<label class=\"form-check-label\" for=\"in").concat(i, "\">\n\t\t").concat(quiz.questions[quiz.current].answers[i].text, "\n\t</label>");
      btn.setAttribute("index", i);
      buttonsElem.appendChild(btn);
    } //Выводим номер текущего вопроса


    if (quiz.current + 1 == quiz.questions.length) {
      $('.nextbtn a span').html('Посмотреть итоги');
    }

    pagesElem.innerHTML = '<p>' + (quiz.current + 1) + "/" + quiz.questions.length + '<p>'; //Вызываем функцию, которая прикрепит события к новым кнопкам

    Init();
  } else {
    //Если это конец, то выводим результат
    buttonsElem.innerHTML = "";
    headElem.innerHTML = "<div class=\"res\">\n\t\t<div class=\"d-flex justify-content-between\">\n\t\t<img src=\"".concat(quiz.results[quiz.result].img, "\" alt=\"\">\n\t\t<a href=\"#\" class=\"underline-link restart\">\u041F\u0440\u043E\u0439\u0442\u0438 \u0435\u0449\u0435 \u0440\u0430\u0437</a>\n\t</div>\n\t\t<h1>\u041E\u0447\u043A\u0438: ").concat(quiz.score, "</h1>\n\t\t<p>").concat(quiz.results[quiz.result].text, "</p>\n\t</div>");
    pagesElem.innerHTML = "";
    $('.quiz__body').css({
      'display': 'none'
    });
    $('.restart').on('click', function () {
      $('.nextbtn a span').html('Следующий вопрос');
      quiz.result = 0;
      quiz.score = 0;
      quiz.current = 0;
      quiz.type = 1;
      console.log(quiz);
      Update();
      $('.quiz__body').css({
        'display': 'block'
      });
    });
  }
}

function Init() {
  //Находим все кнопки
  //Прикрепляем событие для каждой отдельной кнопки
  //При нажатии на кнопку будет вызываться функция Click()
  $('.button').each(function () {
    var _this = this;

    $(this).children('input').on('change', function (e) {
      Click($(_this).attr("index"));
    });
  });
}

function Click(index) {
  $('.button input').each(function () {
    $(this).prop("disabled", true);
  }); //Получаем номер правильного ответа

  var correct = quiz.Click(index);
  console.log(correct); //Находим все кнопки

  var btns = document.getElementsByClassName("button"); //Делаем кнопки серыми

  for (var i = 0; i < btns.length; i++) {
    btns[i].className = "button button_passive form-check";
  } //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным


  if (quiz.type == 1) {
    if (correct >= 0) {
      btns[correct].className = "button button_correct form-check";
    }

    if (index != correct) {
      btns[index].className = "button button_wrong form-check";
    }
  } else {
    //Иначе просто подсвечиваем зелёным ответ пользователя
    btns[index].className = "button button_correct form-check";
  } //Ждём секунду и обновляем тест


  $('.nextbtn').removeClass('d-none');
  $('.answ').removeClass('d-none');
  $('.nextbtn').on('click', 'a', function (e) {
    e.preventDefault();
    Update();
  });
}