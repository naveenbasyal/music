let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
// let present = document.querySelector('#present');
// let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
	{
		name: "Life is Good",
		path: "song6.mp3",
		img: "imgdrake.jfif",
		singer: "Drake"
	},
	{
		name: "The Nights",
		path: "song10.mp3",
		img: "imgnights.jfif",
		singer: "Avicii"
	},
	{
		name: "HumSafar",
		path: "song2.mp3",
		img: "img2.jfif",
		singer: "Akhil SachDeva"
	},
	{
		name: "Nisaar",
		path: "song3.mp3",
		img: "img3.jfif",
		singer: "Arijit Singh"
	},
	{
		name: "Let me Down",
		path: "song7.mp3",
		img: "imglet1.jfif",
		singer: "Alec Benjamin"
	},
	{
		name: "Aag Laage ",
		path: "song1.mp3",
		img: "img1.jfif",
		singer: "Sirazee"
	},
	{
		name: "Intentions ",
		path: "song9.mp3",
		img: "imgjustin.jfif",
		singer: "Justin Bieber"
	},
	{
		name: "Lovely",
		path: "song8.mp3",
		img: "imglove.jfif",
		singer: "Billie / Khalid"
	}
	
];


// All functions


// function load the track
function load_track(index_no) {
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;
	track_image.src = All_song[index_no].img;
	artist.innerHTML = All_song[index_no].singer;
	track.load();

	timer = setInterval(range_slider, 1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);



// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.opacity = "1";
	} else {
		autoplay = 1;
		auto_play.style.opacity = 0.4;
	}
}


function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}
}