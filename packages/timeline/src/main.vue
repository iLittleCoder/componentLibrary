<script>
import GjScrollbar from 'GildataDesign/packages/scrollbar';
export default {
  name: 'GjTimeline',
  components: { GjScrollbar },
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    direction: {
      // 方向
      type: String,
      default: 'left'
    },
    turns: {
      // 交替
      type: Boolean,
      default: false
    },
    // 是否显示虚线
    dashed: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      timeline: this
    };
  },

  render() {
    const reverse = this.reverse;
    const direction = this.direction;
    const turns = this.turns;
    const classes = {
      'gj-timeline': true,
      'is-reverse': reverse,
      ['gj-timeline__' + direction]: true,
      'is-turns': turns
    };
    let slots = this.$slots.default || [];
    if (reverse) {
      slots = slots.reverse();
    }
    let isTurns = this.isTurns;
    if (isTurns) {
      let allHeight = {
        height: this.dataEven + this.dataOdd + 44 + 7 + 'px',
        paddingTop: this.dataOdd + 22 + 'px'
      };
      return (
        <gj-scrollbar>
          <ul class={classes} style={allHeight} id="timeline-ul">
            {slots}
          </ul>
        </gj-scrollbar>
      );
    } else {
      return <ul class={classes}>{slots}</ul>;
    }
  },
  mounted() {
    if (this.isTurns) {
      const options = {
        childList: true,
        attributes: true,
        subtree: true
      };
      const observer = new MutationObserver(this.getChildrenData);
      observer.observe(document.getElementById('timeline-ul'), options);
    }
    window.addEventListener('resize', () => {
      this.getChildrenData();
    });
    this.getChildrenData();
  },
  computed: {
    isTurns() {
      return this.turns && (this.direction === 'top' || this.direction === 'bottom');
    }
  },
  watch: {
    direction(val) {
      if (this.turns && (val === 'top' || val === 'bottom')) {
        this.$nextTick(() => {
          this.getChildrenData();
        });
      }
    }
  },

  methods: {
    getChildrenData() {
      if (this.isTurns) {
        let data = this.$el.querySelectorAll('.gj-timeline-item__wrapper');
        let oneList = [];
        let twoList = [];
        for (let i = 0; i < data.length; i++) {
          if (i % 2 === 0) {
            oneList.push(data[i].clientHeight);
          } else {
            twoList.push(data[i].clientHeight);
            data[i].style.top = -(data[i].clientHeight + 22) + 'px';
          }
        }
        this.dataEven = Math.max(...oneList);
        this.dataOdd = Math.max(...twoList);
      }
    }
  },
  data() {
    return {
      dataEven: 0,
      dataOdd: 0
    };
  }
};
</script>
