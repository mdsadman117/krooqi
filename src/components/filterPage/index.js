import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  View,
  ScrollView,
  Text,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  backgroundColor,
  minArea,
  maxArea,
  minPrice,
  maxPrice,
  propertyStatuses,
} from '../../constants/config';
import MultiSelect from '../../inputControls/MultiSelect';
import I18n from '../../i18n';
import styles from './styles';
import InitialState from '../../reducers/initialState';
import Panel from '../Panel';

class filterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      propertyStatus: props.propertyStatus,
      propertyTypes: props.propertyTypes,
      selectedIndex: 0,
      language: 'java',
      showAll: false,
    };
    this.selectMinPrice = this.selectMinPrice.bind(this);
    this.selectMaxPrice = this.selectMaxPrice.bind(this);
    this.selectRooms = this.selectRooms.bind(this);
    this.selectBaths = this.selectBaths.bind(this);
    this.selectMinArea = this.selectMinArea.bind(this);
    this.selectMaxArea = this.selectMaxArea.bind(this);
    this.selectMinYear = this.selectMinYear.bind(this);
    this.selectMaxYear = this.selectMaxYear.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.searchForm = this.searchForm.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.selectPropertyType = this.selectPropertyType.bind(this);
    this.selectPropertyStatus = this.selectPropertyStatus.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
      if (event.id === 'apply') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down',
        });
      }
    }
  }

  resetForm() {
    this.setState({ search: InitialState.search });
  }

  searchForm() {
    this.props.onFilter(this.state.search);
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  selectMinPrice(value) {
    const { search } = this.state;
    const newVal = {
      ...search,
      priceRange: { ...search.priceRange, start: value },
    };
    this.setState({ search: newVal });
  }

  selectMaxPrice(value) {
    const { search } = this.state;
    const newVal = {
      ...search,
      priceRange: { ...search.priceRange, end: value },
    };
    this.setState({ search: newVal });
  }

  selectMinArea(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, start },
    };
    this.setState({ search: newVal });
  }

  selectMaxArea(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      squareMeterRange: { ...search.squareMeterRange, end },
    };
    this.setState({ search: newVal });
  }

  selectMinYear(start) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, start },
    };
    this.setState({ search: newVal });
  }

  selectMaxYear(end) {
    const { search } = this.state;
    const newVal = {
      ...search,
      yearBuilt: { ...search.yearBuilt, end },
    };
    this.setState({ search: newVal });
  }

  selectRooms(rooms) {
    const { search } = this.state;
    this.setState({ search: { ...search, rooms } });
  }

  selectBaths(baths) {
    const { search } = this.state;
    this.setState({ search: { ...search, baths } });
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  selectPropertyType(value) {
    const { search } = this.state;
    const newVal = { ...search, propertyType: value };
    this.setState({ search: newVal });
  }
  selectPropertyStatus(index) {
    let termId = 0;
    if (index === 0) {
      termId = 33;
    } else if (index === 1) {
      termId = 34;
    } else {
      termId = 108;
    }
    const { search } = this.state;
    const newVal = { ...search, propertyStatus: termId };
    this.setState({ search: newVal });
  }

  renderArea() {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.squareMeterRange.start}
            onValueChange={this.selectMinArea}
          >
            <Picker.Item label="Min Area" />
            {minArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} Sq m`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.squareMeterRange.end}
            onValueChange={this.selectMaxArea}
          >
            <Picker.Item label="Max Area" />
            {maxArea.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} Sq m`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  renderPriceRange() {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.priceRange.start}
            onValueChange={this.selectMinPrice}
          >
            <Picker.Item label="Min Price" />
            {minPrice.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} SAR`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.priceRange.end}
            onValueChange={this.selectMaxPrice}
          >
            <Picker.Item label="Max Price" />
            {maxPrice.map(item => (
              <Picker.Item
                key={item}
                value={`${item}`}
                label={`${I18n.toNumber(item, { precision: 0 })} SAR`}
              />
            ))}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  renderYearBuilt(years) {
    const { search } = this.state;
    return (
      <View style={styles.rowSpaceBetween}>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.yearBuilt.start}
            onValueChange={this.selectMinYear}
          >
            <Picker.Item label="Min Built Year" />
            {years.map(item => <Picker.Item key={item} value={`${item}`} label={`${item}`} />)}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
        <View style={styles.halfWidth}>
          <Picker
            mode="dropdown"
            selectedValue={search.yearBuilt.end}
            onValueChange={this.selectMaxYear}
          >
            <Picker.Item label="Max Built Year" />
            {years.map(item => <Picker.Item key={item} value={`${item}`} label={`${item}`} />)}
          </Picker>
          {Platform.OS !== 'ios' && <View style={styles.divider} />}
        </View>
      </View>
    );
  }

  render() {
    const { OS } = Platform;
    const { propertyTypes } = this.props;
    const { search } = this.state;
    const pl = propertyTypes.map(item => ({
      key: item.term_id,
      value: item.name,
    }));
    let statusSelectedIndex = 0;
    if (search.propertyStatus === 34) {
      statusSelectedIndex = 1;
    }
    if (search.propertyStatus === 108) {
      statusSelectedIndex = 2;
    }
    const years = Array(100)
      .fill()
      .map((_, i) => moment().year() - i);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.flex}>
          <KeyboardAvoidingView style={styles.flex} behavior="padding">
            <View style={styles.margin}>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={propertyStatuses}
                selectedIndex={statusSelectedIndex}
                onTabPress={this.selectPropertyStatus}
              />
            </View>
            {OS === 'ios' ? (
              <Panel title="Price Range" data={search.priceRange}>
                {this.renderPriceRange()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Price Range</Text>
                {this.renderPriceRange()}
              </View>
            )}
            <View style={styles.margin}>
              <Text style={styles.label}>Property Type</Text>
              <MultiSelect
                multiSelectData={pl}
                selectedValues={search.propertyType}
                onSelect={this.selectPropertyType}
              />
              {OS === 'ios' && <View style={[styles.divider, { bottom: 0 }]} />}
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Rooms</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={search.rooms}
                onTabPress={this.selectRooms}
              />
            </View>
            <View style={styles.margin}>
              <Text style={styles.label}>Baths</Text>
              <SegmentedControlTab
                tabStyle={{ borderColor: backgroundColor }}
                activeTabStyle={{ backgroundColor }}
                tabTextStyle={{ color: backgroundColor }}
                values={['Any', '1+', '2+', '3+', '4+']}
                selectedIndex={search.baths}
                onTabPress={this.selectBaths}
              />
            </View>
            {OS === 'ios' ? (
              <Panel title="Square Meter Range" data={search.squareMeterRange}>
                {this.renderArea()}
              </Panel>
            ) : (
              <View style={styles.margin}>
                <Text style={styles.label}>Square Meter Range</Text>
                {this.renderArea()}
              </View>
            )}

            {this.state.showAll && (
              <View>
                {OS === 'ios' ? (
                  <Panel title="Year Built" data={search.yearBuilt}>
                    {this.renderYearBuilt(years)}
                  </Panel>
                ) : (
                  <View style={styles.margin}>
                    <Text style={styles.label}>Year Built</Text>
                    {this.renderYearBuilt(years)}
                  </View>
                )}
                <View style={styles.margin}>
                  <Text style={styles.label}>District</Text>
                  <TextInput
                    style={styles.textInput}
                    value={search.district}
                    placeholder="District"
                    onChangeText={district => this.setState({ search: { ...search, district } })}
                  />
                </View>
              </View>
            )}
            <View style={styles.rowCenter}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() =>
                  this.setState({
                    showAll: !this.state.showAll,
                  })}
              >
                <View>
                  <Text style={styles.padding}>
                    {this.state.showAll ? 'Show Less' : 'Show More'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={this.resetForm}>
            <View>
              <Text style={styles.label}>Reset</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={{ marginRight: 10 }}
                name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart-outline'}
                size={20}
              />
              <Text style={styles.label}>Save Search</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.searchForm}>
            <View>
              <Text style={styles.label}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

filterPage.propTypes = {
  search: PropTypes.object.isRequired,
  propertyStatus: PropTypes.array.isRequired,
  propertyTypes: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default filterPage;
