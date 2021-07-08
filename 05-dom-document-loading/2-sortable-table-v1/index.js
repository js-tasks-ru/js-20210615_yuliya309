export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = [])
  {
    if(Array.isArray(headerConfig) && headerConfig.length !== 0)
      this.headerConfig = [...headerConfig];
    else
      this.headerConfig = [];

    if(Array.isArray(data) && data.length !== 0)
      this.data = [...data];
    else
      this.data =[];

    this.createElement();
  }

  createElement()
  {
    this.element = document.createElement('div');
    this.element.className = "sortable-table";
    this.element.innerHTML = this.getInnerElement();

    const subElements = this.element.querySelectorAll('[data-element]');
    for(const subEl of subElements)
    {
      const nameElement = subEl.dataset.element;
      this.subElements[nameElement] = subEl;
    }

    this.subElements.header.innerHTML = this.getInnerHeader();
    this.subElements.body.innerHTML = this.getInnerBody(0, this.data.length);
  }

  getInnerElement()
  {
    // Метод создает тело element, состоящее из subElementHeader и subElementBody.
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      </div>
      <div data-element="body" class="sortable-table__body">
      </div>`;
  }

  getInnerHeader()
  {
    // Метод создает тело subElementHeader.
    return this.headerConfig.map(function (item) {
      return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" ${(item.sortable_order)? 'data-order="' + item.sortable_order + '"' : ''}>
          <span>${item.title}</span>
          <span data-element="arrow", class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
          </span>
        </div>`;
    }).join('');
  }

  getInnerBody(startItem, size)
  {
    // Метод создает тело subElementBody.
    if(this.headerConfig.length === 0)
      return;
    const data = this.data.slice(startItem, startItem + size);
    return data.map(this.getRow.bind(this)).join('');
  }
  getInnerBodySort(dataSort)
  {
    // Метод создает тело subElementBody.
    if(this.headerConfig.length === 0)
      return;
    return dataSort.map(this.getRow.bind(this)).join('');
  }
  
  getRow(item)
  {
    // Метод создает одну строку с данными о товаре - item.

    // columnArray - массив столбцов текущей строки.
    const columnArray = [];   
    
    // Переберем каждый столбец таблицы, чтобы создать и заполнить поля текущей строки.
    for(let column of this.headerConfig)                            
    {
      columnArray.push( ('template' in column)? column.template(item[column.id]) : `
        <div class="sortable-table__cell">
          ${item[column.id]}
        </div>`);
    }
    // Добавим в строку ссылку на товар и соединим все созданные столбцы текущей строки.
    return `<a href="${this.getLink(item)}" class="sortable-table__row">` + columnArray.join('');
  }

  getLink(item)
  {
    // Метод формирует ссылку на товар - item.
    // ССылка формируется из категорий товара.
    let obj = item.subcategory;
    const linkArray = [item.id];
     
    while(true)
    {
      // Запишем id категории.
      linkArray.unshift(obj.id);

      // Если следующей категории нет, то закончим.
      if(obj.category === undefined)
        break;

      // Следующая категория есть, продолжим работу с ней.
      obj = obj.category;
    }
    linkArray.unshift('http:/');

    // Сформируем строку-ссылку.
    return linkArray.join('/');
  }

  sort(fieldValue, orderValue)
  {
    // Найдем индекс элемента, который необходимо отсортировать.
    let columnField = -1;
    let compare;
    let dataSort = [...this.data];

    if(this.headerConfig.length === 0)
      return;

    // Найдем столбец по которому нужно отсортировать данные.
    for(let item of this.headerConfig)
    {
      if(item.id === fieldValue)
      {
        columnField = item;
        continue;
      }
      item.sortable_order = null;
    }
    // Проверим, был ли найден столбец.
    if(columnField === -1)
      return;

    // Добавим значение в столбец.
    columnField.sortable_order = orderValue;

    // Выберем функцию для сортировки значений в зависимости от типа данных в столбце.
    if(columnField.sortType === 'number')
      compare = this.compareNumber;
    if(columnField.sortType === 'string')
      compare = this.compareString;


      dataSort = dataSort.sort(function (item1, item2) {
      return compare(item1[fieldValue], item2[fieldValue], orderValue)
    });


    this.subElements.header.innerHTML = this.getInnerHeader();
    this.subElements.body.innerHTML = this.getInnerBodySort(dataSort);

  }
      
  compareString(value1, value2, orderValue) 
  {
    // Сортировка для строк.
    const order = {
        asc: 1,
        desc: -1,
    }
    if(!(orderValue in order))
        return;

    return order[orderValue] * value1.localeCompare(value2,[ "ru","en",],{caseFirst:"upper"}); 
  }

  compareNumber(value1, value2, orderValue)
  {
    // Сортировка для чисел.
    const order = {
      asc: 1,
      desc: -1,
    }
    if(!(orderValue in order))
      return;

    return order[orderValue] * (value1 - value2);
  }

  remove()
  {
      this.element.remove();
  }

  destroy()
  {
      if(this.element !== null)
      {
          this.remove();
      }
      this.element = null;
      this.subElements = {};
      
      this.headerConfig = [];
      this.data =[];
  }


}

