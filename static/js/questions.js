const correctNext = document.getElementById('correct-next');
const score = document.getElementById('score');

// Points logic
addShamrocks = () => {
    let shamrocks = Number(localStorage.getItem('shamrocks'));
    shamrocks++
    localStorage.setItem('shamrocks', shamrocks);
}

correctNext.addEventListener('click', addShamrocks);

// Resets the points if user tries to go back or forward
// code by Tobias Schneider: https://gist.github.com/tobytailor/1164818
if(window.history && history.pushState){ // check for history api support
	window.addEventListener('load', function(){
		// create history states
		history.pushState(-1, null); // back state
		history.pushState(0, null); // main state
		history.pushState(1, null); // forward state
		history.go(-1); // start in main state

		this.addEventListener('popstate', function(event, state){
			// check history state and fire custom events
			if(state = event.state){

				event = document.createEvent('Event');
				event.initEvent(state > 0 ? 'next' : 'previous', true, true);
				this.dispatchEvent(event);

				// reset state
				history.go(-state);
			}
		}, false);
	}, false);
}

window.addEventListener('next', function(){
    localStorage.setItem('shamrocks', 'Cheater');
}, false);
    
window.addEventListener('previous', function(){
    localStorage.setItem('shamrocks', 'Cheater');
}, false);