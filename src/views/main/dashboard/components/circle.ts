import {TRUE} from "sass";
import {getStaffDistribution} from "@/api/corporation";
import {hideLoading, showLoading} from "@/utils/system/loading";
import router from "@/router";

let data2

const getStaffDistributionOp = (init: boolean) => {
    getStaffDistribution()
        .then(res => {
            data2 = res.data
            // console.log(typeof (option.series[0].data))
            // console.log(options.series[0].data)
            console.log(typeof (res.data))
            console.log(res.data)
            return res.data
            // console.log(store.state.corp.info)
            // console.log(store.state.corp.info.name)
        })
}

getStaffDistributionOp(true)
console.log('?????????????!',data2)

const option = {
    title: {
        text: '员工部门分布',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '100%'],
            avoidLabelOverlap: true,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 10
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '26',
                    fontWeight: 'bold',
                    formatter: (p) => {
                        let dom = `<div backgroundColor="red">1</div>`
                        return p.name + '\n' + p.value
                    }
                }
            },
            labelLine: {
                show: true
            },
            data: data2
        }
    ]
};

export default option