export default class ColumnChart {

    element;
    data;
    label;
    value;
    link;
    formatHeading;
    chartHeight = 50;

    constructor({
        data = [],
        label = '',
        value = 0,
        link = '',
        formatHeading = value => value
      } = {}
    )
    {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.formatHeading = formatHeading;

        this.element = document.createElement('div');
        this.element.style = `--chart-height: ${this.chartHeight}`;
        this.element.className = this.getClassToString();
        this.element.innerHTML = this.getInner();
    }
    
    getDivs()
    {
        const maxValue = this.data.reduce(function (preVal, item) {
            return preVal > item ? preVal : item;
        }, this.data[0]);
        const res50 = 50 / maxValue;
        const res100 = 100 / maxValue;

        return this.data.map(function (itemValue){
            return `<div style="--value: ${Math.floor(itemValue * res50)}" data-tooltip="${Math.round(itemValue * res100)}%"></div>`;
        });
    }
    getLink()
    {
        return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
    }
    getClass()
    {
        if(this.data.length !== 0)
            return "column-chart";
        return ["column-chart","column-chart_loading"];
    }
    getClassToString()
    {
        if(this.data.length !== 0)
            return "column-chart";
        return "column-chart column-chart_loading";
    }

    getInner()
    {
             return `
            <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                ${this.formatHeading(this.value)}
                </div>
                <div data-element="body" class="column-chart__chart">
                ${this.getDivs().join('')}
                </div>
            </div>
            `;
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

        // // Новое тело элемента.
        this.element.style = `--chart-height: ${this.chartHeight}`;
        this.element.className = this.getClassToString();
        this.element.innerHTML = this.getInner();
    }


    remove()
    {
        this.element.remove();
    }
    destroy()
    {
        this.remove();
    }
}
