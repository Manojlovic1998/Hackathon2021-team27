import os, random
from flask import Flask, render_template, json, request,\
    redirect, url_for, session, jsonify
# import JSON file

# Flask Config
DEVELOPMENT = os.getenv('DEVELOPMENT', False)

app = Flask(__name__)
app.secret_key = os.getenv('APP_SECRET_KEY')

# gets the JSON file with questions
questions_json = os.path.join(app.static_folder, 'models', 'questions.json')

with open(questions_json) as question_file:
    questions = json.load(question_file)


# Functions
def start_session(user):
    session['user_created'] = True
    session['user'] = user

    return jsonify(user), 200


def shuffle_questions(q):
    # Create random set of questions keys.
    selected_keys = []
    i = 0
    while i < len(q):
        current_selection = list(q[i].keys())
        for key in current_selection:
            if key != "more_info":
                if key not in selected_keys:
                    selected_keys.append(key)
                    i += 1
    random.shuffle(selected_keys)
    return selected_keys


questions_shuffled = shuffle_questions(questions)


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
@app.route('/first_question/<questionNumber>')
def first_question(questionNumber):
    """[summary]

    Returns:
    [type]: [description]
    """
    if int(questionNumber) == 1:
        questions_shuffled = shuffle_questions(questions)

    question = questions_shuffled[int(questionNumber)]
    for question_object in questions:
        if question in list(question_object.keys()):
            answers = question_object[question]
            more_info = question_object['more_info']

    return render_template('questions.html',
                           question=question,
                           question_nr=questionNumber,
                           answers=answers,
                           more_info=more_info)


# A view for all the questions
@app.route('/answer_check', methods=['GET', 'POST'])
def check_answer():
    if request.method == 'POST':
        print(request)


@app.route('/start_game')
def renderStartGame():
    """Renders starting page for the game.

    Returns:
        [object]: Response object.
    """
    return render_template('startgame.html')


@app.route('/user', methods=['POST'])
def create_or_get_user():
    """Depending on the request line type, GET OR POST and if
    the user exists in session. It will create new user in
    session or get the old one.

    Returns:
        [object]: Response object.
    """
    if session.get('user') is None and request.method == "POST":
        user = {
            'name': request.form.get('user_name'),
        }
        start_session(user)
        questionNumber = 1
        return redirect(url_for('first_question',
                                questionNumber=questionNumber))
    else:
        questionNumber = 1
        return redirect(url_for('first_question',
                                questionNumber=questionNumber))


@app.route('/info_page')
def renderInfoPage():
    """Renders info page.

    Returns:
        [object]: Response object.
    """
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
