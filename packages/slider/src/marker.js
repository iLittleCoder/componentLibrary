export default {
  name: 'JyMarker',

  props: {
    mark: {
      type: [String, Object]
    }
  },
  render() {
    let label = typeof this.mark === 'string' ? this.mark : this.mark.label;

    return (
      <div class="jy-slider__marks-text" style={this.mark.style || {}}>
        {label}
      </div>
    );
  }
};
