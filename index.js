let data1 = [
    {
        "name": "油",
        "profit": 19.01,
        "config": {
            "colo": 0
        }
    },
    {
        "name": "米",
        "profit": 129.08,
        "config": {
            "colo": 0
        }
    },
    {
        "name": "盐",
        "profit": 539.11,
        "config": {
            "colo": 0
        }
    }
];

let data2 = [
    {
        "spot": "186.00",
        "name": "油",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718793250
    },
    {
        "spot": "186.00",
        "name": "油",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718723250
    },
    {
        "spot": "186.00",
        "name": "油",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1711793250
    },
    {
        "spot": "186.00",
        "name": "米",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1712793250
    },
    {
        "spot": "186.00",
        "name": "盐",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718793250
    },
    {
        "spot": "186.00",
        "name": "盐",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718743250
    },
    {
        "spot": "186.00",
        "name": "面",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718723250
    },
    {
        "spot": "186.00",
        "name": "蒜",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 0,
        "buy_time": 1718193250
    },
    {
        "spot": "186.00",
        "name": "蒜",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 1,
        "buy_time": 1711793250
    },
    {
        "spot": "186.00",
        "name": "葱",
        "run_info": {
            "buy_value": 8902.3,
            "buy_amount": 3.623
        },
        "status": 1,
        "buy_time": 1718793212
    }
];

function extractData(data1, data2) {
    let result = [];

    data1.forEach(item => {
        let name = item.name;
        let filteredData2 = data2.filter(d => d.name === name);
        let count = filteredData2.length;

        if (count < 3) {
            // 先排序，再取额外需要的数据
            let nonCurrentNameData = data2.filter(d => d.name !== name).sort((a, b) => b.status - a.status);
            let additionalDataNeeded = 3 - count;

            result = result.concat(nonCurrentNameData.slice(0, additionalDataNeeded));
        }
    });

    return result;
}

console.log(extractData(data1, data2));