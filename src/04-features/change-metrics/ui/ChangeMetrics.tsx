import { Dropdown, DropdownGroup, DropdownItem } from '@/06-shared/ui';
import { Button } from '@/06-shared/ui';

import './change-metrics.css';

import iconUnits from 'assets/icons/icon-units.svg';
import dropdownIcon from 'assets/icons/icon-dropdown.svg';
import checkmarkIcon from 'assets/icons/icon-checkmark.svg';

import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { useMetricsStore } from '../model/metrics-store';

const TEMP_UNITS = {
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
} as const;

const WIND_UNITS = {
  KMH: 'kmh',
  MPH: 'mph',
} as const;

const PRECIP_UNITS = {
  MILLIMETERS: 'mm',
  INCHES: 'inch',
} as const;

export function ChangeMetrics() {
  const [isOpened, setIsOpened] = useState(false);

  const { tempUnit, windUnit, precipUnit, setTempUnit, setWindUnit, setPrecipUnit } = useMetricsStore(
    useShallow((state) => {
      return {
        tempUnit: state.tempUnit,
        windUnit: state.windUnit,
        precipUnit: state.precipUnit,

        setTempUnit: state.setTempUnit,
        setWindUnit: state.setWindUnit,
        setPrecipUnit: state.setPrecipUnit,
      };
    })
  );

  return (
    <Dropdown
      onClick={() => {
        setIsOpened(!isOpened);
      }}
      isOpened={isOpened}
      trigger={<Button beforeIcon={<img src={iconUnits} />} afterIcon={<img src={dropdownIcon} />} text="Units" />}
    >
      <span className="metrics-title">Switch to Imperial</span>

      <DropdownGroup title="Temperature">
        <DropdownItem
          onClick={() => {
            setTempUnit(TEMP_UNITS.CELSIUS);
          }}
          selected={tempUnit === TEMP_UNITS.CELSIUS}
          text="Celsius (°С)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setTempUnit(TEMP_UNITS.FAHRENHEIT);
          }}
          selected={tempUnit === TEMP_UNITS.FAHRENHEIT}
          text="Fahrenheit (°F)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>
      <DropdownGroup title="Wind Speed">
        <DropdownItem
          onClick={() => {
            setWindUnit(WIND_UNITS.KMH);
          }}
          selected={windUnit === WIND_UNITS.KMH}
          text="kmh"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setWindUnit(WIND_UNITS.MPH);
          }}
          selected={windUnit === WIND_UNITS.MPH}
          text="mph"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>

      <DropdownGroup title="Precipitation">
        <DropdownItem
          onClick={() => {
            setPrecipUnit(PRECIP_UNITS.MILLIMETERS);
          }}
          selected={precipUnit === PRECIP_UNITS.MILLIMETERS}
          text="Millimeters (mm)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setPrecipUnit(PRECIP_UNITS.INCHES);
          }}
          selected={precipUnit === PRECIP_UNITS.INCHES}
          text="Inches (in)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>
    </Dropdown>
  );
}
