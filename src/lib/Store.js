import { observable, action } from 'mobx';
import moment from 'moment';

class Store {
  mktData = { mktData: [] };
  @observable chartData = [];
  @observable index = [];
  @observable selectedItem = null;
  @observable coefficient = 1;

  @action async loadData() {
    try {
      const response = await fetch('/mktdata.json');
      this.mktData = await response.json();
      this.index = this.mktData.mktData.map(item => item.instrumentId);
      console.log('Loaded mktdata.json', this.mktData);
    } catch (err) {
      console.log('Error loading mktdata.json - ', err);
    }
  }

  @action selectItem(val) {
    this.selectedItem = val || 0;
  }

  @action setCoefficient(val) {
    if (this.coefficient === val) return;
    if (typeof val !== 'number') val = parseFloat(val);
    if (Number.isNaN(val)) val = 1;
    this.coefficient = val;
  }

  @action formatChartData() {
    // Fet the item data
    const itemData = this.mktData.mktData[this.selectedItem];
    // Format and sort the data
    const chartData = [
      {
        key: 'value',
        color: '#00BCD4',
        values: itemData.timeSeries.entries
        .map(item => ({
          x: new Date(item.d),
          y: item.v * this.coefficient,
        }))
        .sort((a, b) => a.x.getTime() < b.x.getTime() ? -1 : 1)
      },
    ];
    this.chartData = chartData;
  }

  // Formatter for the X axis labels
  formatX = d => {
    // Return the formated date
    return moment(d).format('Y-M-D')
  };

  // Formatter for the Y axis labels
  formatY = d => {
    // Get the maximum value
    let max = -1000;
    this.chartData[0].values
    .forEach(el => el.y > max ?
      max = el.y :
      max
    );
    // Get the minumum value
    let min = max;
    this.chartData[0].values
    .forEach(el => el.y < min ?
      min = el.y :
      min
    );
    // Get the ratio
    const ratio = (d +1) / 2;
    // Return the label text
    return parseFloat(min + ((max - min) * ratio)).toFixed(1);
  }
}

export default Store;