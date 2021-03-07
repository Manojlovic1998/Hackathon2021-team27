import os
import env
from flask import Flask, render_template, json
# import JSON file

# Flask Config

if env:
    # Sets Values Using env.py file
    DEVELOPMENT = env.DEVELOPMENT
    APP_SECRET_KEY = env.APP_SECRET_KEY
else:
    # Sets Values For Deployed Environment
    DEVELOPMENT = False

app = Flask(__name__)
app.secret_key = os.getenv('APP_SECRET_KEY', APP_SECRET_KEY)

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
    with open(questions_json) as q:
        questions = json.load(q)
    
    question_nr = 0
    next_question = question_nr + 1

    return render_template('questions.html',
                            questions=questions,
                            question_nr=question_nr,
                            next_question=next_question
                            )


# A view for all the questions
@app.route('/questions_loop/<current_question>')
def questions_loop(current_question):
    with open(questions_json) as q:
        questions = json.load(q)

    question_nr = int(current_question)
    
    if question_nr == 9:
        return render_template('victory.html')
    else:
        next_question = question_nr + 1

        return render_template('questions.html',
                                questions=questions,
                                question_nr=question_nr,
                                next_question=next_question
                                )


if __name__ == '__main__':
    app.run(host=os.getenv('IP'),
            port=os.getenv('PORT'),
            debug=DEVELOPMENT)
