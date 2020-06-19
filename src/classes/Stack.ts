export default class Stack {
  // FILO stack

  maxElements: number;
  data: Array<string>;

  constructor(initialData: Array<string> = [], maxElements = 3) {
    this.maxElements = maxElements;
    this.data = initialData.slice(0, this.maxElements);
  }

  unshift(e: string) {
    this.data.unshift(e);

    if (this.data.length > this.maxElements) {
      this.data.pop();
    }
  }

  // Invoker custom methods
  /**
   * @param o Object like {q:1,w:1,e:1} or {q:3}
   */
  equals(o: null | { [index: string]: number }): boolean {
    if (!o) {
      return false;
    }

    let equal = true;
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        const value: number = o[key];
        const occurrences = this.data.filter(e => e === key).length;

        if (occurrences !== value) {
          equal = false;
          break;
        }
      }
    }

    return equal;
  }
}
