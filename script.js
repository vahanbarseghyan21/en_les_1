var tableData = [
    {'name': 'ill', 'translation': 'հիվանդ'},
    {'name': 'heart', 'translation': 'սիրտ'},
    {'name': 'heart attack', 'translation': 'սրտի կաթված'},
    {'name': 'healthy', 'translation': 'առողջ'},
    {'name': 'vegetables', 'translation': 'բանջարեղեն'},
    {'name': 'bread', 'translation': 'հաց'},
    {'name': 'sushi', 'translation': 'սուշի'},
    {'name': 'rice', 'translation': 'բրինձ'},
    {'name': 'for you', 'translation': 'ձեզ համար'},
    {'name': 'always', 'translation': 'միշտ'},
    {'name': 'salt', 'translation': 'աղ'},
    {'name': 'pepper', 'translation': 'բիբար, պղպեղ'},
    {'name': 'fish', 'translation': 'ձուկ'},
    {'name': 'sugar', 'translation': 'շաքար'},
    {'name': 'popular', 'translation': 'հայտնի'},
    {'name': 'carrots', 'translation': 'գազար'},
    {'name': 'beans', 'translation': 'լոբի'},
    {'name': 'potatoes', 'translation': 'կարտոֆիլ'},
    {'name': 'tomatocs', 'translation': 'լոլիկ'},
    {'name': 'peas', 'translation': 'ոլոռ'},
    {'name': 'onions', 'translation': 'սոխ'},
    {'name': 'garlie', 'translation': 'սխտոր'},
    {'name': 'mushrooms', 'translation': 'սունկ'},
    {'name': 'pear', 'translation': 'տանձ'},
    {'name': 'grapes', 'translation': 'խաղող'},
    {'name': 'strawberries', 'translation': 'ելակ'},
    {'name': 'wine', 'translation': 'գինի'},
    {'name': 'beer', 'translation': 'գարեջուր'},
    {'name': 'mineral water', 'translation': 'աղբյուրի ջուր'},
    {'name': 'milk', 'translation': 'կաթ'},,
    {'name': 'fruit juice', 'translation': 'մրքային հյութ'},
    {'name': 'dictionary', 'translation': 'բառարան'},
    {'name': 'umbrella', 'translation': 'անձրևանոց'},
    {'name': 'begin', 'translation': 'սկսել'},
    {'name': 'mean', 'translation': 'նշանակել, նկատի ունենալ'},
    {'name': 'repet', 'translation': 'կրկնել'},
    {'name': 'understend', 'translation': 'հասկանալ'},
]


/*
	1 - Loop Through Array & Access each value
  2 - Create Table Rows & append to table
*/


var state = {
    'querySet': tableData,
    'rows': 12,
    'window': 5,
}

buildTable()

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages); 

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info success">${page}</button>`;
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info danger">&#171; First</button>` + wrapper.innerHTML;
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info info">Last &#187;</button>`;
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable();
    })

}


function buildTable() {
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet
    var num = 1;
    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].translation}</td>
                  `
        table.append(row)
    }
    num++;
    pageButtons(data.pages)
}
