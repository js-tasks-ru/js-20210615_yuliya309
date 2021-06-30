export default class ColumnChart {

    element;
    data;
    label;
    value;
    link;

    constructor({
        data = [],
        label = '',
        value = 0,
        link = value => value
      }
    )
    {
        this.data = [...data];
        this.label = label;
        this.value = value;
        this.link = link;

        this.element = document.createElement('div');
        this.element.style = '--chart-height: 50';
        this.createInnerAndClass(data.length === 0);
    }
    
    createDivsChild()
    {
        // Найдем максимальное значение.
        const maxValue = this.data.reduce(function (preVal, item) {    
            return preVal > item ? preVal : item; 
        });

        // Сформируем массив div'ов - столбцов 
        return this.data.map(function (itemValue){
            return `<div style="--value: ${itemValue * 50 / maxValue}" data-tooltip="${itemValue * 100 / maxValue}"%></div>`;
        })
    }

    createInnerAndClass(isNull = true)
    {
        let value = this.value;
        if( typeof link === 'function')
            value = link(value);
        
        if(isNull === true)
        {
            // "Скелет"
            this.element.className = 'column-chart column-chart_loading';
            this.element.innerHTML = 
            `<div class="column-chart__title">
                ${this.label}
              <a class="column-chart__link" href="#">View all</a>
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header">
                ${value}
              </div>
              <div data-element="body" class="column-chart__chart">
              </div>
            </div>`;
        }
        else
        {
            // Элемент
            this.element.className = 'column-chart';
            this.element.innerHTML = 
            `<div class="column-chart__title">
                ${this.label}
                <a href="/sales" class="column-chart__link">View all</a>
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                ${value}
                </div>
                <div data-element="body" class="column-chart__chart">
                ${this.createDivsChild().join('')}
                </div>
            </div>`;
        }
    }


    update({
        data= [],
        label = '',
        value= 0,
        link = value => value
      }) 
    {
        this.data = data;
        this.label = label;
        this.value = value;
        this.link = link;

        // Новое тело элемента.
        his.createInnerAndClass(data.length === 0);
    }

}
