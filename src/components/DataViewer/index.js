import React, { Component } from 'react';
import './index.css';
import { observer, inject } from 'mobx-react';
import { SelectField, MenuItem, Slider, TextField } from 'material-ui';
import NVD3 from 'react-nvd3';

@inject('store')
@observer
class DataViewer extends Component {
  // Handle the item selection
  itemChanged = (e, val) => {
    this.props.store.selectItem(val);
    this.props.store.formatChartData();
  }

  // Handle the coefficient change
  coefficientChanged = (e, val) => {
    this.props.store.setCoefficient(val);
    if (this.props.store.selectedItem)
      this.props.store.formatChartData();
  }

  // Render the view
  render() {
    return (
      <div className="DataViewer vertical layout flex">
        <div className="controls horizontal layout">
          <SelectField
            floatingLabelText="Instrument"
            onChange={this.itemChanged}
            value={this.props.store.selectedItem}
          >
            {
              this.props.store.index.map((item, i) =>
              <MenuItem
                key={i}
                value={i}
                primaryText={item}
              />)
            }
          </SelectField>
          <TextField
            style={{width: '4rem'}}
            floatingLabelText="Coefficient"
            value={this.props.store.coefficient}
            disabled={true}
          />
          <Slider
            style={{
              marginTop: '.5rem'
            }}
            className="flex"
            onChange={this.coefficientChanged}
            min={1}
            max={10}
            step={0.1}
            defaultValue={1}
            value={this.props.store.coefficient}
          />
        </div>
        <div className="content flex">
          <div style={{width: '100%', height: '100%'}}>
            <NVD3
              showLegend={false}
              useInteractiveGuideline={true}
              x='Date'
              y='Value'
              xAxis={{
                tickFormat: this.props.store.formatX,
                rotateLabels: -30
              }}
              x2Axis={{
                tickFormat: this.props.store.formatX,
                rotateLabels: -.00001
              }}
              yAxis={{tickFormat: this.props.store.formatY}}
              type="lineWithFocusChart"
              datum={this.props.store.chartData}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DataViewer;
