	function doubleClickEdit(el, focusClass = '', cb){
		var listItems = document.querySelectorAll(el);						//#1 Selects all the items
		for (var i =  listItems.length - 1; i >= 0; i--) {					//#2 Iterate through each items
			 listItems[i].addEventListener("dblclick", function(e){			//#3 Add function on Double Click event over all the items
				if (this.getElementsByTagName('input').length) return;		//#4 Checks if the expected function already execute finding the input element that we are going to create on Double Click
			 	
			 	var listItem = this;										//#5 Assign the item to variable to reference later
			 	var value = this.innerHTML;									//#6 Gets the initial value of the item & assign it to the variable to be filled in to the input later
			 	var valueLength = value.length;								//#7 Gets the length of the item value to use later
			 	var form = document.createElement("form");					//#8 Create a form element to enable editing the item content 
			 	var input = document.createElement("input");				//#9 Create an input element to go inside the form
			 	input.setAttribute("type","text");							//#10 Sets the type attribute for the input element
			 	input.setAttribute("value", value);							//#11 Sets the default value for the input element from the variable line#6


			 	form.appendChild(input);									//#12 Appends the input element inside the form element
			 	this.innerHTML = "";										//#13 Clears the item contents to assign the form inside to enable editing
			 	this.appendChild(form);										//#14 Appends the form inside the item

			 	var liveInput = this.getElementsByTagName('input')[0];		//#15 Selects the recently appended input element in the DOM tree
			 	liveInput.focus();											//#16 Focus the cursor in the input element 
			 	liveInput.setSelectionRange(valueLength, valueLength);		//#17 Sets the cursor position at the end of the 
			 	this.classList.add(focusClass);								//#18 Add a css class to the item to highlight it slightly different from other items as it is editable
			 	
			 	liveInput.addEventListener("blur", function(e){				//#19 Listens to the blur event on input element in DOM tree
			 		listItem.innerHTML = this.value;						//#20 Gets the updated value from the input element & place it in the item by removing the form
			 		listItem.classList.remove(focusClass);					//#21 Removes the css class as the item is no more editable
			 		cb(this.value);											//logs the value to the console. Here other operations like ajax call to save the value in the database can be performed.
			 	});

			 	var liveForm = this.getElementsByTagName('form')[0]; 		//#22 Selects the recently appended Form element in the DOM tree
			 	liveForm.addEventListener("submit", function(e){			//#23 Listens to the submit event on the form
			 		e.preventDefault();										//#24 Prevents the default submission
			 		listItem.innerHTML = liveInput.value;					//#25 Gets the updated value from the input element & place it in the item by removing the form, same as line#20
			 		listItem.classList.remove(focusClass);					//#26 Removes the css class as the item is no more editable
			 		cb(liveInput.value);									//logs the value to the console. Here other operations like ajax call to save the value in the database can be performed.

			 	});

			 });
		}
	}