const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/"


function getURL(url, callback){
    fetch(url)
      .then(res => res.json())
      .then(res => callback(res))
   }
    
function createTable(information){
      const table = document.getElementById('tablaUno');
      const tableDos = document.getElementById('tablaDos');
      const tableBodyUno = table.querySelector('tbody');
      const tableBodyDos = tableDos.querySelector('tbody');

      // Limpiar la tabla
      tableBodyUno.innerHTML = ""
      
      numVariables = 1
      listEvets = []

      for ( const element of information) {
          
          const { events, squirrel } = element;
          const rowEvents = events.toString().split(",")
          listEvets = listEvets.concat(rowEvents);
          const row = document.createElement("tr")

          const num = document.createElement("td")
          num.textContent = numVariables;
          row.appendChild(num)

          const dayEvents = document.createElement("td")
          dayEvents.className = "dayEvents"
          dayEvents.textContent = events.toString();
          row.appendChild(dayEvents)
          
          const booleanEvent = document.createElement("td")
          booleanEvent.className = "booleanEvent"
          booleanEvent.textContent = squirrel.toString();
          
          row.appendChild(booleanEvent)

          if (squirrel.toString() === 'true' ){
            row.style.backgroundColor = "#f9c6cb"
          }       

          row.className = "rowEvent"
          tableBodyUno.appendChild(row)
          numVariables += 1
      }

      unique = listEvets.filter(onlyUnique)
      
      numUnique = 1
      let itemsCorrelation = []
      for(const element of unique){
            let TP = 0;
            let TN = 0;
            let FP = 0;
            let FN = 0;

            for ( const dataElement of information){

                const { events, squirrel } = dataElement
                // TP
                if (events.includes(element) && squirrel)  {
                    TP += 1
                }
                // TN
                else if (!events.includes(element) && !squirrel) {
                    TN += 1
                }
                // FP
                else if(!events.includes(element) && squirrel) {
                    FP += 1
                }
                // FN
                else if(events.includes(element) && !squirrel){
                    FN += 1
                }
            }

            mccVal  = mcc(TP, TN, FP, FN)
            itemsCorrelation.push({name: element, correlation: mccVal})
            numUnique += 1
      }

      itemsCorrelation.sort((a,b) => b.correlation - a.correlation )

      numVariablesDos = 1
      for ( const element of itemsCorrelation) {
                  
        const rowDos = document.createElement("tr")

        const num = document.createElement("td")
        num.textContent = numVariablesDos;
        rowDos.appendChild(num)

        const dayEvents = document.createElement("td")
        dayEvents.className = "dayEvents"
        dayEvents.textContent = element.name;
        rowDos.appendChild(dayEvents)
        
        const booleanEvent = document.createElement("td")
        booleanEvent.className = "booleanEvent"
        booleanEvent.textContent = element.correlation;
        
        rowDos.appendChild(booleanEvent)

        rowDos.className = "rowEvent"
        tableBodyDos.appendChild(rowDos)
        numVariablesDos += 1
    }


}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


function mcc(TP, TN, FP, FN){
    firstLine = TP*TN - FP*FN
    innerSqr = (TP+FP)*(TP+FN)*(TN+FP)*(TN+FN)
    sqr = Math.sqrt(innerSqr)
    return firstLine / sqr
}

getURL(url, createTable);