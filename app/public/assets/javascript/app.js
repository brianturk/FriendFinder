
// Create the array allQuestions and generate all of the new questions
var questions = [
    { question: "The Designated Hitter is great for baseball", num: 1 },
    { question: "Barry Bonds should not be in the Hall of Fame", num: 2 },
    { question: "Babe Ruth is the best player of all time", num: 3 },
    { question: "Baseball games take too long", num: 4 },
    { question: "Pete Rose be reinstated back into baseball", num: 5 },
    { question: "Stickball is better than Wiffleball", num: 6 },
    { question: "A pitcher can win the MVP award", num: 7 },
    { question: "The WAR statistic is hard to understand, but I still like it", num: 8 },
    { question: "'Field of Dreams' is the best baseball movie", num: 9 },
    { question: "Instant replay is good for baseball", num: 10 }
]

var tempArr = [];
var n = questions.length;
//random sort the questions
for (var i = 0; i < n - 1; i++) {
    tempArr.push(questions.splice(Math.floor(Math.random() * questions.length), 1)[0]);
}
tempArr.push(questions[0]);
questions = tempArr;

var number = 0;
var answers = [];


$(document).ready(function () {

    function newQuestion() {
        $("#content").fadeOut(500, function () {
            $("#answers").css("display", "inline-block");
            $('#radio1').prop('checked', false);
            $('#radio2').prop('checked', false);
            $('#radio3').prop('checked', false);
            $('#radio4').prop('checked', false);
            $('#radio5').prop('checked', false);

            if (number < questions.length) {
                $("#questCount").text("Question: " + (number + 1) + " of " + questions.length);
                $("#question").html(questions[number].question);
                number++
            } else {
                $("#survey").css("display", "none");
                $("#bestMatch").css("display", "inline-block");
                var allValues = {
                    name: $("#name").val(),
                    photo: $("#photo").val(),
                    answers: answers
                };

                $.post("/api/friends", allValues)
                    .then(function (data) {
                        
                        console.log(data);

                        if (data.length === 0) {
                            var newP = $("<p>");
                            newP.text("No match found.")
                            $("#match").empty();
                            $("#match").append(newP);
                        } else {
                            var newP = $("<p>");
                            newP.html("<h1>Best Match:</h1>");

                            var nameP = $("<p>");
                            nameP.text(`${data.name}`);

                            var newImg = $("<img>");
                            newImg.attr("class", "match-img-size");
                            newImg.attr("src", data.photo);

                            $("#match").empty();
                            $("#match").append(newP, nameP, newImg);
                        }
                    
                    });
            }
        });
        if (number < questions.length) {
            $("#content").fadeIn(400);
        }
    }

    $(document).on("click", "#begin", function () {
        $("#start").css("display", "none");
        $("#getName").css("display", "inline-block");

        $('#name').focus();
    })

    $("#namePhoto").on("submit", function (e) {
        e.preventDefault();
        $("#getName").css("display", "none");
        $("#survey").css("display", "inline-block");
        newQuestion();
    })

    $(document).on("click", ".radioAnswer", function () {
        $(this).val()
        answers.push({
            answer: $(this).val(),
            num: questions[number-1].num
        })
        newQuestion()
        $(this).blur();
    })

});


