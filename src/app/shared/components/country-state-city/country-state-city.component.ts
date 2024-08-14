import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSelectComponent } from '../common-select/common-select.component';
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonDataService } from './service/common-data.service';
import { UtilityService } from '@services/utility.service';
import { DropdownValueTypeIData } from '@interface/common.interface';
import { ERROR_TEXT_FIELD_ENUM } from '@enums/error-text-field.enum';

@Component({
  selector: 'app-country-state-city',
  standalone: true,
  templateUrl: './country-state-city.component.html',
  styleUrls: ['./country-state-city.component.scss'],
  imports: [
    CommonModule,
    CommonSelectComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CountryStateCityComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() formGroupName!: string;
  @Input() id = '';
  @Input() styleClass = 'w-40';
  @Input() isDisplayFlex = true;
  @Input() liveCity = true;

  @Output() countryStateCityChange = new EventEmitter();

  errorText = ERROR_TEXT_FIELD_ENUM;
  countryData: DropdownValueTypeIData[] = [];
  stateData: DropdownValueTypeIData[] = [];
  cityData: DropdownValueTypeIData[] = [];

  countryId = '';
  stateId = '';
  cityId = '';
  data = {} as any;

  @Input('data') set errorData(value: any) {
    if (value && !!Object.keys(value).length) {
      this.data = value;

      this.countryId =
        this.data.country && this.data.country.id ? this.data.country.id : '';
      this.stateId =
        this.data.state && this.data.state.id ? this.data.state.id : '';
      this.cityId =
        this.data.city && this.data.city.id ? this.data.city.id : '';
      this.getStateData();
      this.getCityWithAwait();

      setTimeout(() => {
        this.patchFormValue();
      }, 1000);
    }
  }

  async getCityWithAwait() {
    await this.getCityData(true);
  }

  @Input() isDisabledEntireField = false;

  constructor(
    private _httpCommonDataService: CommonDataService,
    private rootFormGroup: FormGroupDirective,
    private _httpUtility: UtilityService
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.getCountryData();
  }

  /**
   *
   * @param value get data behalf of value
   * @param control
   */
  getData(value: string, control: string) {
    if (control === 'country') {
      this.countryId = value;
      this.form.controls['state'].setValue('');
      this.form.controls['city'].setValue('');
      this.getStateData();
    }
    if (control === 'state') {
      this.stateId = value;
      this.form.controls['city'].setValue('');
      this.getCityData();
      this.countryStateCityChange.emit();
    }
    if (control === 'city') {
      this.cityId = value;
      this.setSelectedCountryStateCityData();
    }
  }

  /**
   * fetch country data here...
   */
  getCountryData() {
    this._httpCommonDataService.countryList().subscribe((response) => {
      this.countryData = this._httpUtility.changeObjectKeyName(
        response.result,
        'name',
        'value',
        'name',
        'id'
      );
      this.setSelectedCountryStateCityData();
    });
  }

  /**
   * fetch state data behalf of country id...
   */
  getStateData() {
    const obj = {
      countryId: this.countryId,
    };

    this._httpCommonDataService.stateList(obj).subscribe((response) => {
      this.stateData = [];
      this.cityData = [];
      this.stateData = this._httpUtility.changeObjectKeyName(
        response.result,
        'name',
        'value',
        'name',
        'stateId'
      );
      this.setSelectedCountryStateCityData();
    });
  }

  /**
   *  fetch city data behalf of state id...
   */

  getCityData(flag?: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.stateId) {
        return;
      }
      const obj = {
        countryId: this.countryId,
        stateId: this.stateId,
        isLive: this.liveCity,
      };

      this._httpCommonDataService.cityList(obj).subscribe((response) => {
        this.cityData = [];
        this.cityData = this._httpUtility.changeObjectKeyName(
          response.result,
          'name',
          'value',
          'name',
          'cityId'
        );
        if (!!flag && !!this.cityData.length) {
          this.setSelectedCountryStateCityData();
        }
      });
      resolve(this.cityData);
    });
  }

  /**
   * patch value into form controls
   */
  async patchFormValue() {
    this.form.controls['country'].setValue(this.countryId);
    this.form.controls['state'].setValue(this.stateId);
    this.form.controls['city'].setValue(this.cityId);
  }

  setSelectedCountryStateCityData() {
    const countryObj = this.countryData.find((x) => x.value == this.countryId);
    const stateObj = this.stateData.find((x) => x.value == this.stateId);
    const cityObj = this.cityData.find((x) => x.value == this.cityId);

    const selectedCountryStateCityData = {
      country: countryObj,
      state: stateObj,
      city: cityObj,
    };
    this.countryStateCityChange.emit(selectedCountryStateCityData);
  }
}
