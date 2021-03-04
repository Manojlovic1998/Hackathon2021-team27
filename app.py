import os
from flask import Flask, render_template


# Flask Config
app = Flask(__name__)
app.secret_key = b'\x90?A\x82\x04\xecwn*\xf1\xc3.|\xc8u|'


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
            debug=True)
