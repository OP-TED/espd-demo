Vue.component("publicFooter", {
	data() {
		return {
			show: true
		}
	},
	template: `
	<div class="footercontainer">
        <span class="text-muted">Provided by <a href="https://joinup.ec.europa.eu/collection/eprocurement/solution/european-single-procurement-document">EU OP ESPD</a> 2024</span>
    </div>
	`
});