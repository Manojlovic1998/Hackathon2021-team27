import os
import random
from flask import Flask, render_template, json
# import JSON file

# Flask Config
DEVELOPMENT = os.getenv('DEVELOPMENT', False)

app = Flask(__name__)
app.secret_key = os.getenv('APP_SECRET_KEY')

# gets the JSON file with questions
questions_json = os.path.join(app.static_folder, 'models', 'questions.json')


# Views
@app.route('/')
def renderLandingPage():
    """Renders Landing page. Upon receiving
    GET request.

    Returns:
        [object]: Response object.
    """
    return render_template('index.html')


# A view for the first question
@app.route('/first_question')
def first_question():
    """[summary]

    Returns:
        [type]: [description]
    """
    with open(questions_json) as q:
        questions = json.load(q)

    question_nr = 0
    correct = questions[question_nr]["correct"]
    incorrect1 = questions[question_nr]["incorrect1"]
    incorrect2 = questions[question_nr]["incorrect2"]
    answers = [correct, incorrect1, incorrect2]
    random.shuffle(answers)
    next_question = question_nr + 1

    return render_template('questions.html',
                           questions=questions,
                           question_nr=question_nr,
                           next_question=next_question,
                           answers=answers)


# A view for all the questions
@app.route('/questions_loop/<current_question>')
def questions_loop(current_question):
    """[summary]

    Args:
        current_question ([type]): [description]

    Returns:
        [type]: [description]
    """
    with open(questions_json) as q:
        questions = json.load(q)

    question_nr = int(current_question)

    if question_nr == 9:
        return render_template('victory.html')
    else:
        correct = questions[question_nr]["correct"]
        incorrect1 = questions[question_nr]["incorrect1"]
        incorrect2 = questions[question_nr]["incorrect2"]
        answers = [correct, incorrect1, incorrect2]
        random.shuffle(answers)
        next_question = question_nr + 1

        return render_template('questions.html',
                               questions=questions,
                               question_nr=question_nr,
                               next_question=next_question,
                               answers=answers)

@app.route('/info_page')
def renderInfoPage():
    return render_template('info.html')

@app.route('/scoreboard')
def renderScoreboardPage():
    """Renders Scoreboard page. Upon receiving
    GET request.

    Returns:
        [object]: Response object.
    """
    return render_template('scoreboard.html')


if __name__ == '__main__':
    app.run(host=os.getenv('IP'),
            port=os.getenv('PORT'),
            debug=DEVELOPMENT)
