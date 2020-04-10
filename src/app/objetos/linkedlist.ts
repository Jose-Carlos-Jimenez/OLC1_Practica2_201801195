export class Node {
    public elem;
    public next;

    constructor(elem) {
        this.elem = elem;
        this.next = null;
    }
}

export class LinkedList {
    public head = null;
    public len = 0;

    public append(elem) {
        const node = new Node(elem);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    }

    public removeAt(pos) {
        if (pos > -1 && pos < this.len) {
            let current = this.head;
            let previous;
            let index = 0;

            if (pos === 0) {
                this.head = current.next;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.len--;
            return current.elem;
        } else {
            return null;
        }
    }

    public getAt(i)
    {
      if (i > -1 && i < this.len)
      {
        let current = this.head;
        let index = 0;
        if (i === 0)
        {
          this.head = current.next;
        }
        else
        {
          while (index++ < i)
          {
            current = current.next;
          }
        }
        return current.elem;
      }
      else
      {
        return null;
      }
    }

    public insert(elem, pos) {
        if (pos > -1 && pos < this.len) {
            let current = this.head;
            let index = 0;
            let previous;
            const node = new Node(elem);

            if (pos === 0) {
                node.next = current;
                this.head = node;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.len++;
            return true;
        } else {
            return false;
        }
    }

    public toString() {
        let current = this.head;
        let str = '';
        while (current) {
            str += current.elem; // output is undefinedundefinedundefined
            // str += JSON.stringify(current);
            // prints out {"next":{"next":{}}}{"next":{}}{}
            current = current.next;
        }
        return str;
    }
}
