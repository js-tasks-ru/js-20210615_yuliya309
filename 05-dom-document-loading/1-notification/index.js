export default class NotificationMessage {

    static oldElement = null;
    static oldTime = null;
    element = null;

    constructor(textValue, {
        duration = 0,
        type = ''
      } = {})
    {
        this.textValue = textValue;
        this.duration = duration;
        this.type = type;

        this.createElement();
    }

    createElement()
    {
        this.element = document.createElement('div');
        this.element.style = `--value:${this.duration / 1000}s`;
        this.element.className = `notification ${this.type}`;
        this.element.innerHTML = this.getInner();

    }
    getInner()
    {
             return `
             <div class="timer"></div>
             <div class="inner-wrapper">
               <div class="notification-header">${this.type}</div>
               <div class="notification-body">
                ${this.textValue}
               </div>
             </div>
            `;
    }

    show(parent = document.body)
    {
        if(NotificationMessage.oldElement !== null)
        {
            NotificationMessage.oldElement.remove();
            clearTimeout(NotificationMessage.oldTime);
        }

        NotificationMessage.oldElement = this.element;
        parent.append(this.element);

        NotificationMessage.oldTime = setTimeout(() => {
            this.remove();
        }, this.duration);

    }

    remove()
    {
        this.element.remove();
        clearTimeout(NotificationMessage.oldTime);
    }

    destroy()
    {
        if(this.element !== null)
        {
            this.remove();
        }
        NotificationMessage.oldElement = null;
        NotificationMessage.oldTime = null;
        this.element = null;
    }
}
