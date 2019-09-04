package main

import (
	"fmt"
	"strings"

	"github.com/cheikhshift/gos/core"
)

var list = []string{
	"Login",
	"Salesman Dashboard",
	"Customer Profile",
	"New Order Search",
	"Salesman Choose Route",
	"Route Home",
	"Route Add Stop",
	"Route List",
	"Navigation",
	"Salesman Stop on Route",
	"Salesman Customer Order Summary",
	"Payment Flow",
	"PickerChecker Dash",
	"Picker Choose Route",
	"Checker choose vendor",
	"Stops to Pick",
	"Pick Product",
	"Check in Vendor Product",
	"Assign vendor Product Details",
}

func main() {

	for _, view := range list {
		viewCamel := strings.Replace(view," ", "", -1)
		com := fmt.Sprintf("ionic generate page %s", viewCamel)
		core.RunCmd(com)
	}

}
