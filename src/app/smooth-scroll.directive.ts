import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSmoothScroll]'
})
export class SmoothScrollDirective {
  
  targetElement: any;

  constructor() { }

  @Input('appSmoothScroll') public scrollTo: string;

	@HostListener('click') onClick() {
		this.targetElement = document.getElementById(this.scrollTo);
		if (!this.targetElement) return;

		new SmoothScroll(this.targetElement);
	};
}

class SmoothScroll {
	constructor(element: any) {
		this.smoothScroll(element);
	}
	private smoothScroll(element) {

		// Options
		let duration = 800;

		/**
		 * Retrieve current location
		 */
		let getScrollLocation = function () {
			if (window.pageYOffset) {
				return window.pageYOffset;
			} else {
				return document.documentElement.scrollTop;
			}
		};

		/**
		 * Calculate easing pattern.
		 *
		 * 20150713 edit - zephinzer
		 * - changed if-else to switch
		 * @see http://archive.oreilly.com/pub/a/server-administration/excerpts/even-faster-websites/writing-efficient-javascript.html
		 */
		let getEasingPattern = function (time) {
			return time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
		};

		/**
		 * Calculate how far to scroll
		 */
		let getEndLocation = function (element) {
			let location = 0,
				elementRect = element.getBoundingClientRect(),
				absoluteElementTop = elementRect.top + window.pageYOffset;

			location = absoluteElementTop;

			return Math.max(location, 0);
		};

		// Initialize the whole thing
		setTimeout(function () {
			let currentLocation = null,
				startLocation = getScrollLocation(),
				endLocation = getEndLocation(element),
				timeLapsed = 0,
				distance = endLocation - startLocation,
				percentage,
				position,
				scrollHeight,
				internalHeight;

			/**
			 * Stop the scrolling animation when the anchor is reached (or at the top/bottom of the page)
			 */
			let stopAnimation = function () {
				currentLocation = getScrollLocation();
				scrollHeight = document.body.scrollHeight;
				internalHeight = window.innerHeight + currentLocation;

				if (
					( // condition 1
						position == endLocation
					) ||
					( // condition 2
						currentLocation == endLocation
					) ||
					( // condition 3
						internalHeight > scrollHeight
					)
				) { // stop
					clearInterval(runAnimation);
				}
			};

			/**
			 * Scroll the page by an increment, and check if it's time to stop
			 */
			let animateScroll = function () {
				timeLapsed += 16;
				percentage = (timeLapsed / duration);
				percentage = (percentage > 1) ? 1 : percentage;
				position = startLocation + (distance * getEasingPattern(percentage));
				window.scrollTo(0, position);
				stopAnimation();
			};

			let runAnimation = setInterval(animateScroll, 16);
		}, 0);

	}
}