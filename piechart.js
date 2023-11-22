
function plotChart(height,weight,index){
    var chartDom = document.getElementById(`heightAndWeigth${index}`);
    var myChart = echarts.init(chartDom);
    var option;
    var customColors = ['#306cb4', ' #ffcb05'];
    option = {
       
      legend: {
        top: '7%',
        left: 'center',
        data: ['Height','Weight']
      },
   
      series: [
        {
            top:'10%',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: height, name: 'Height', label: { formatter: '{c} m' } }, // Add 'm' to height label
            { value: weight, name: 'Weight', label: { formatter: '{c} kg' } },
          ],
          color: customColors
        }
      ]
    };
    
  myChart.setOption(option);
}