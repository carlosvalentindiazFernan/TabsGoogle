( ()=> {
	'use strict';
	const ulContainer = document.querySelector('.tabContainer');
	const form = document.querySelector('.appendTabForm');
	const contentTitle = document.querySelector('.contentTitle');
	const contentParagraph = document.querySelector('.contentParagraph');

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
			const obj = tabs[this.getAttribute('data-id')];
			console.log(contentTitle);
			contentTitle.innerHTML = obj.tabContentTitle;
			contentParagraph.innerHTML = obj.tabContentParagraph;

		}

		// for add new tab from form
		pushTab(){
			event.preventDefault();

			let data = this.mixins.serializeForm();
			if(tabs.length === 0){
				data['id'] = 0;
			} else {
				data['id'] = (tabs.length - 1)+1;	
			}

			console.log('data ',data);
			let liTemplate = document.createElement('li');
			liTemplate.classList.add('tabItem');
			liTemplate.setAttribute('data-id',data.id);
			liTemplate.innerHTML = data.tabName;
			liTemplate.addEventListener('click',this.toggle);

			tabs.push(data);
			ulContainer.appendChild(liTemplate);
		}
	}

	const core = new Core();
	form.addEventListener('submit',(event)=> {
		core.pushTab();
	});

})();