export const DAY_STATUS = {
  NONE: 0,
  SINGLE_CHOSEN: 1,
  RANGE_BEGIN_CHOSEN: 2,
  RANGE_MIDDLE_CHOSEN: 3,
  RANGE_END_CHOSEN: 4,
};

export const Helper = {
  getDayStatus(date, selectionRange = [], data) {
    let status = DAY_STATUS.NONE;
    const [startDate, endDate] = selectionRange;
    // if (!(startDate || startDate == 0) || !endDate) {
    //   return status;
    // }

    if (+startDate === +endDate) {
      if (+date.date === +startDate) {
        return DAY_STATUS.SINGLE_CHOSEN;
      }
    } else {
      if (+startDate === +date.date && data[+date.date - 1] && data[+date.date - 1].status === 2) {
        return DAY_STATUS.RANGE_MIDDLE_CHOSEN;
      } else if (+endDate === +date.date && data[+date.date + 1].status === 4) {
        return DAY_STATUS.RANGE_MIDDLE_CHOSEN;
      } else if (+date.date === +startDate) {
        return DAY_STATUS.RANGE_BEGIN_CHOSEN;
      } else if (+date.date > +startDate && +date.date < +endDate) {
        return DAY_STATUS.RANGE_MIDDLE_CHOSEN;
      } else if (+date.date === +endDate) {
        return DAY_STATUS.RANGE_END_CHOSEN;
      }
    }
    if (
      status === 0 &&
      data[+date.date - 1] &&
      data[+date.date - 1].status === 3
    ) {
      data[+date.date - 1].status = 4;
    }
    // console.log(date);
    if (
      date.status !== 0 &&
      data[+date.date + 1] &&
      data[+date.date + 1].lock
    ) {
      const datHourStr = data[+date.date + 1].data.planned_start_time.slice(0, 2);
      let datHourNum = datHourStr[0] === '0' ? +datHourStr[1] : +datHourStr;
      if (datHourNum === data[+date.date + 1].hour) {
        data[+date.date + 1].status = 1;
      }
    }

    return status;
  },
  binarySearch(data = [], comparedObj, comparedFunc) {
    let start = 0;
    let end = data.length;
    let middle;

    let compareResult;
    while (start <= end) {
      middle = Math.floor((start + end) / 2);
      compareResult = comparedFunc(data[middle], comparedObj);
      if (compareResult < 0) {
        end = middle - 1;
      } else if (compareResult === 0) {
        return data[middle];
      } else {
        start = middle + 1;
      }
    }
    return undefined;
  },
  // Здесь происходит поиск элементотв, на которые мы наводимся. Поиск ведется по координатам?
  positionToDate(position, dayLayoutsIndex) {
    //dayLayoutsIndex - передается массив с месяцами.
    // В каждом месяце находится массив, где каждый индекс - строка
    // Соответсвенно в каждой строке массив с днями недели

    // 1. используйте двоичный поиск, чтобы найти monthIndex
    const monthData = Helper.binarySearch(
      dayLayoutsIndex,
      position,
      (cur, compared) => {
        if (compared.y < cur.boundary.upper) {
          return -1;
        } else if (compared.y > cur.boundary.lower) {
          return 1;
        } else {
          return 0;
        }
      },
    );
    // 2. используйте двоичный поиск, чтобы найти rowData
    if (monthData === undefined) {
      return null;
    }
    const rowData = Helper.binarySearch(
      monthData.dayLayouts,
      position,
      (cur, compared) => {
        if (compared.y < cur[0].y) {
          return -1;
        } else if (compared.y > cur[0].y + cur[0].height) {
          return 1;
        } else {
          return 0;
        }
      },
    );

    // 3. используйте двоичный поиск, чтобы найти результат
    if (rowData === undefined) {
      return null;
    }
    const result = Helper.binarySearch(rowData, position, (cur, compared) => {
      if (compared.x < cur.x) {
        return -1;
      } else if (compared.x > cur.x + cur.width) {
        return 1;
      } else {
        return 0;
      }
    });
    // 4. вернуть окончательный результат
    return result === undefined ? null : result.date;
  },

  arrayTransform(arr = []) {
    if (arr.length === 0) {
      return [];
    }

    let result = [[]],
      lastY = arr[0].y;
    for (let i = 0, count = 0; i < arr.length; i++) {
      if (arr[i].y === lastY) {
        result[count].push(arr[i]);
      } else {
        lastY = arr[i].y;
        result[++count] = [arr[i]];
      }
    }

    return result;
  },
  buildIndexItem({dayLayouts, left, right}) {
    const len = dayLayouts.length;
    return {
      boundary: {
        left,
        right,
        upper: dayLayouts[0].y,
        lower: dayLayouts[len - 1].y + dayLayouts[len - 1].height,
      },
      dayLayouts: Helper.arrayTransform(
        dayLayouts.map((item, index) => {
          const date = `${index}`;
          if (index === 0) {
            return Object.assign({date}, item, {
              x: left,
              width: item.x + item.width - left,
            });
          } else if (index === len - 1) {
            return Object.assign({date}, item, {width: right - item.x});
          } else {
            return Object.assign({date}, item);
          }
        }),
      ),
    };
  },
  isEmptyArray(arr) {
    if (arr instanceof Array) {
      return arr.length === 0;
    } else {
      return false;
    }
  },
  waitFor(millSeconds) {
    return new Promise(resolve => {
      setTimeout(resolve, millSeconds);
    });
  },
  getValue(obj, keyChain, defaultValue) {
    // 输入不合法
    if (!(obj instanceof Object) || typeof keyChain !== 'string') {
      return defaultValue;
    }

    // 从keyChain中提取出以:分割的keys
    const keys = keyChain.split(':');

    // 遍历key，如果遇到值为undefined，返回默认值; 否则，返回真正的值
    let result = obj;
    for (let i = 0; i < keys.length; i++) {
      if (result[keys[i]] === undefined) {
        result = defaultValue;
        break;
      } else {
        result = result[keys[i]];
      }
    }
    return result;
  },
};
