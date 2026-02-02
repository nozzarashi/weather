import { Dropdown, DropdownGroup, DropdownItem, Button } from '@/06-shared/ui'

import './change-metrics.css'

import iconUnits from 'assets/icons/icon-units.svg'
import dropdownIcon from 'assets/icons/icon-dropdown.svg'
import checkmarkIcon from 'assets/icons/icon-checkmark.svg'

import { useShallow } from 'zustand/shallow'
import { useMetricsStore } from '../model/metrics-store'

const TEMP_UNITS = Object.freeze({
  CELSIUS: 'celsius',
  FAHRENHEIT: 'fahrenheit',
} as const)

const WIND_UNITS = Object.freeze({
  KMH: 'kmh',
  MPH: 'mph',
} as const)

const PRECIPITATION_UNITS = Object.freeze({
  MILLIMETERS: 'mm',
  INCHES: 'inch',
} as const)

export function ChangeMetrics() {
  const { tempUnit, windUnit, precipitationUnit, setTempUnit, setWindUnit, setPrecipitationUnit } =
    useMetricsStore(
      useShallow((state) => {
        return {
          tempUnit: state.tempUnit,
          windUnit: state.windUnit,
          precipitationUnit: state.precipitationUnit,

          setTempUnit: state.setTempUnit,
          setWindUnit: state.setWindUnit,
          setPrecipitationUnit: state.setPrecipitationUnit,
        }
      }),
    )

  return (
    <Dropdown
      trigger={
        <Button
          // TODO: alt атрибут обязателем для img, пройди по всему проекту и проставь
          beforeIcon={<img src={iconUnits} />}
          afterIcon={<img src={dropdownIcon} />}
          text="Units"
        />
      }
    >
      <span className="metrics-title">Switch to Imperial</span>

      <DropdownGroup title="Temperature">
        <DropdownItem
          onClick={() => {
            setTempUnit(TEMP_UNITS.CELSIUS)
          }}
          selected={tempUnit === TEMP_UNITS.CELSIUS}
          text="Celsius (°С)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setTempUnit(TEMP_UNITS.FAHRENHEIT)
          }}
          selected={tempUnit === TEMP_UNITS.FAHRENHEIT}
          text="Fahrenheit (°F)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>
      <DropdownGroup title="Wind Speed">
        <DropdownItem
          onClick={() => {
            setWindUnit(WIND_UNITS.KMH)
          }}
          selected={windUnit === WIND_UNITS.KMH}
          text="kmh"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setWindUnit(WIND_UNITS.MPH)
          }}
          selected={windUnit === WIND_UNITS.MPH}
          text="mph"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>

      <DropdownGroup title="Precipitation">
        <DropdownItem
          onClick={() => {
            setPrecipitationUnit(PRECIPITATION_UNITS.MILLIMETERS)
          }}
          selected={precipitationUnit === PRECIPITATION_UNITS.MILLIMETERS}
          text="Millimeters (mm)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
        <DropdownItem
          onClick={() => {
            setPrecipitationUnit(PRECIPITATION_UNITS.INCHES)
          }}
          selected={precipitationUnit === PRECIPITATION_UNITS.INCHES}
          text="Inches (in)"
          icon={<img src={checkmarkIcon} alt="иконка отмеченного пункта" />}
        />
      </DropdownGroup>
    </Dropdown>
  )
}
