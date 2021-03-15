import Rete from "rete";
import { NumControl } from "../controls/numControl.js";
import { NumSocket } from "../sockets/sockets";

var CustomNode = {
  template: `<div class="node" :class="[selected(), node.name]  | kebab">
  <div class="title">{{node.name}}</div>
  <div style='float:left; width:60%;'>
    <!-- Inputs-->
    <div class="input" v-for="input in inputs()" :key="input.key">
      <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
      <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
      <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
    </div>
  </div>
  <div style='float:left; width:40%;'>
    <!-- Outputs-->
    <div class="output" v-for="output in outputs()" :key="output.key">
      <div class="output-title">{{output.name}}</div>
      <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
    </div>
  </div><div style='clear:both'></div>
</div>`,
  mixins: [VueRenderPlugin.default.mixin],
  components: {
    Socket: VueRenderPlugin.default.Socket
 }
};

export class NumComponent extends Rete.Component {
    constructor(){ super("Number"); 
        this.data.component = CustomNode;
        this.data.render = 'vue';
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", NumSocket);
        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}
