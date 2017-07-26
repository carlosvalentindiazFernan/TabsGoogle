( ()=> {
	'use strict';
	const ulContainer = document.querySelector('.tabContainer');
	const form = document.querySelector('.appendTabForm');
	const contentTitle = document.querySelector('.contentTitle');
	const contentParagraph = document.querySelector('.contentParagraph');
	const fcontainer = document.querySelector('.tabForm');
	const tabContentContainer = document.querySelector('.tabContentContainer');
	const mainTab = document.querySelector('.mainTab');
	const close = document.getElementsByClassName('fa-times');

	const tabs = [
		// Example of pushed object
		// {
		// 	tabName:'Tab Uno',
		// 	tabContentTitle: 'titulo tab uno',
		// 	tabContentParagraph: 'lorem 1'
		// },
	];

	class Mixins {
		constructor (){

		}

		serializeForm (){

			const data = new FormData(form);

			let tmp = {};

			for (let [k,v] of data.entries()){
				tmp[k] = v;
			}

			return tmp;

		}

		cleanActive() {
			const elems = document.querySelector('li');

			for(let i in elems){
				i.classList.remove('active');
			}
		}

		static create () {
			return new Mixins();
		}
	}

	class Core {

		constructor(){
			this.mixins = Mixins.create();
		}

		//for toggling dynamic tabs
		toggle(){
			let elems = document.getElementsByTagName('li');

			for(let i of elems){
				console.log(i);
				i.classList.remove('active');
			}

			this.classList.add('active');
			fcontainer.classList.add('hidden');
			const obj = tabs[this.getAttribute('id')];
			console.log(contentTitle);
			contentTitle.innerHTML = obj.tabContentTitle;
			contentParagraph.innerHTML = obj.tabContentParagraph;
			tabContentContainer.classList.remove('hidden');


		}

		showAdd() {
			const elems = document.getElementsByTagName('li');

			for(let i of elems){
				i.classList.remove('active');
			}

			this.classList.add('active');
			fcontainer.classList.remove('hidden');
			tabContentContainer.classList.add('hidden');
		}

		// for add new tab from form
		pushTab(){
			event.preventDefault();

			let data = this.mixins.serializeForm();

			if(tabs.length == 8){
				return false;
			}

			if(tabs.length === 0){
				data['id'] = 0;
			} else {
				data['id'] = (tabs.length - 1)+1;
			}

			console.log('data ',data);
			let liTemplate = document.createElement('li');
			liTemplate.classList.add('tabItem');
			liTemplate.setAttribute('id',data.id);
			liTemplate.innerHTML = data.tabName;

			liTemplate.addEventListener('click',this.toggle);


			tabs.push(data);
			ulContainer.appendChild(liTemplate);

			ulContainer.appendChild(liTemplate);

			form.reset();
		}
	}

	const core = new Core();
	form.addEventListener('submit',(event)=> {
		core.pushTab();
	});

	mainTab.addEventListener('click',core.showAdd);




})();
