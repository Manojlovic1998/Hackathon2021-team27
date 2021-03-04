import os
import env
from flask import Flask, render_template


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


# Views

@app.route('/')
def renderLandingPage():
    """Renders Landing page. Upon receiving
    GET request.

    Returns:
        [object]: Response object.
    """
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host=os.getenv('IP'),
            port=os.getenv('PORT'),
            debug=DEVELOPMENT)
