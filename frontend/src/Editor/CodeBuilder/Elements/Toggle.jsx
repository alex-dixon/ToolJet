import React from 'react';
// import { ToolTip } from './Components/ToolTip';
import FxButton from './FxButton';

export const Toggle = ({ value, onChange, forceCodeBox }) => {
  return (
    <div className="row" style={{ position: 'relative' }}>
      <div className="col">
        <div className="field mb-3">
          <label className="form-check form-switch my-1">
            <input
              className="form-check-input"
              type="checkbox"
              onClick={() => onChange(`{{${!value}}}`)}
              checked={value}
            />
            {/* <ToolTip label={paramLabel} meta={{}} labelClass="form-check-label" /> */}
          </label>
        </div>
      </div>
      <div className="col-auto pt-2 style-fx" style={{ position: 'absolute', top: '-36px', right: '0px' }}>
        <FxButton active={false} onPress={forceCodeBox} />
      </div>
    </div>
  );
};
