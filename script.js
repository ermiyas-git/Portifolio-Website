const themeBtn = document.getElementById('themeMode');
        const body = document.body;
        
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('light-mode')) {
                themeBtn.innerHTML = `<img src="images/icons8-dark-mode-50.png" width="30px" class="sun" style=" background-color: #f0f7ff;">` ;
            } else {
                themeBtn.innerHTML=`<img src="images/icons8-light-mode-78.png" width="30px" class="sun" >` ;
            }
        });
