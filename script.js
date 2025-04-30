document.addEventListener("DOMContentLoaded", function () {
  // Define breakpoints for different screen sizes
  const breakpoints = {
    mobilePortrait: 479,
    mobileLandscape: 767,
    tablet: 991,
  };
  test01;
  test02;
  test03;
  //shit piss krc
  // Loop through elements that have the data-animation attribute
  document.querySelectorAll("[data-animation]").forEach(function (element) {
    let $this = element,
      windowWidth = window.innerWidth,
      disableOn = $this.getAttribute("disable-on");

    // Skip animation if it should be disabled on the current viewport width
    if (
      disableOn &&
      ((disableOn.includes("mobilePortrait") &&
        windowWidth <= breakpoints.mobilePortrait) ||
        (disableOn.includes("mobileLandscape") &&
          windowWidth <= breakpoints.mobileLandscape) ||
        (disableOn.includes("tablet") && windowWidth <= breakpoints.tablet))
    ) {
      return; // Skip this element, no animation applied
    }

    // Check if animations for X should be disabled on smaller screens
    if (windowWidth <= 1024) {
      console.log("X animations disabled for screen width <= 1024px");
      return; // Skip X animations
    }

    // Get the animation details from the data attributes
    const animationName = $this.getAttribute("data-animation");
    const animationType = $this.getAttribute("data-animation-type");
    const duration = parseFloat($this.getAttribute("data-duration")) || 1;
    const stagger = parseFloat($this.getAttribute("data-stagger")) || 0.5;

    // Set up animation parameters for GSAP
    const params = {
      duration: duration,
      ease: $this.dataset.ease || "power1.out",
      stagger: stagger,
      scrollTrigger: {
        trigger: $this,
        start: $this.getAttribute("data-start") || "top 90%",
        end: $this.getAttribute("data-end") || "bottom top",
      },
    };

    // Run the animation based on the name and type, ensure your `animations` object is defined somewhere in your code
    if (animationName && animationType) {
      // Check if the animation exists in your animations object
      if (
        animations[animationName] &&
        typeof animations[animationName][animationType] === "function"
      ) {
        // Run the animation with the appropriate parameters
        animations[animationName][animationType]($this, params);
      } else {
        console.warn(
          `Animation type "${animationType}" not found for "${animationName}"`
        );
      }
    }
  });
});

const animations = {
  "fade-up": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0,
        yPercent: 50, // Changed from y to yPercent for more responsive effect
        duration: (params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0, yPercent: 50 }, // Changed from y to yPercent
        {
          opacity: 1,
          yPercent: 0,
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0,
        yPercent: 50, // Changed from y to yPercent
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0,
        yPercent: 100, // Adjusted from 120 to 100 for a cleaner reveal
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        yPercent: 100, // Adjusted from 120 to 100 for consistency
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },

  "fade-down": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0,
        yPercent: -50, // Start above the screen
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0, yPercent: -50 }, // Start above the screen
        {
          opacity: 1,
          yPercent: 0, // End at its original position
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0,
        yPercent: -50, // Start above the screen for staggered items
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation with fade down
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0,
        yPercent: -50, // Start above the screen
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation with fade down
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        opacity: 0,
        yPercent: -50, // Start above the screen
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },

  "fade-in": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0, // Start with 0 opacity for fade-in effect
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0 }, // Start with 0 opacity
        {
          opacity: 1, // Fade to 100% opacity
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0, // Start with 0 opacity
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation with fade-in effect
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0, // Start with 0 opacity
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation with fade-in effect
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        opacity: 0, // Start with 0 opacity
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },

  "fade-left": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0, // Start with 0 opacity
        xPercent: -50, // Start the element off-screen to the left
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0, xPercent: -50 }, // Start with opacity 0 and off-screen to the left
        {
          opacity: 1, // Fade to full opacity
          xPercent: 0, // Move the element to its original position
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0, // Start with opacity 0
        xPercent: -50, // Start off-screen to the left for staggered items
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation with fade left
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0, // Start with 0 opacity
        xPercent: -50, // Start off-screen to the left
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation with fade left
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        opacity: 0, // Start with 0 opacity
        xPercent: -50, // Start off-screen to the left
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },

  "fade-right": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0, // Start with 0 opacity
        xPercent: 50, // Start the element off-screen to the right
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0, xPercent: 50 }, // Start with opacity 0 and off-screen to the right
        {
          opacity: 1, // Fade to full opacity
          xPercent: 0, // Move the element to its original position
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0, // Start with opacity 0
        xPercent: 50, // Start off-screen to the right for staggered items
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation with fade right
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0, // Start with 0 opacity
        xPercent: 50, // Start off-screen to the right
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation with fade right
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        opacity: 0, // Start with 0 opacity
        xPercent: 50, // Start off-screen to the right
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },

  "scale-in": {
    standard: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.from(element, {
        opacity: 0, // Start with 0 opacity
        scale: 0.5, // Start scaled down
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        scrollTrigger: params.scrollTrigger, // Directly using scrollTrigger from params
        onComplete: () => $(element).css("transition-property", ""),
      });
    },

    scroll: (element, params = {}) => {
      $(element).css("transition-property", "none");
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.5 }, // Start with opacity 0 and scaled down
        {
          opacity: 1, // Fade to full opacity
          scale: 1, // Scale to original size
          duration: getNumber(params.duration, 1.2),
          ease: (params.ease, "power1.out"),
          scrollTrigger: {
            start: (params.start, "top 80%"),
            end: (params.end, "bottom 20%"),
            toggleActions: (params.toggleActions, "play none none reverse"),
            scrub: getBoolean(params.scrub, true),
          },
          onComplete: () => $(element).css("transition-property", ""),
        }
      );
    },

    stagger: (element, params = {}) => {
      $(element)
        .children()
        .each(function () {
          $(this).css("transition-property", "none");
        });

      gsap.from($(element).children(), {
        opacity: 0, // Start with 0 opacity
        scale: 0.5, // Start scaled down
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.1),
        scrollTrigger: {
          start: (params.start, "top 80%"),
          end: (params.end, "bottom 20%"),
          toggleActions: (params.toggleActions, "play none none reverse"),
          scrub: getBoolean(params.scrub, true),
        },
        onComplete: () => {
          $(element)
            .children()
            .each(function () {
              $(this).css("transition-property", "");
            });
        },
      });
    },

    // ➕ Added support for word-based animation with scale-in
    words: (element, params = {}) => {
      gsap.from($(element).find(".word"), {
        opacity: 0, // Start with 0 opacity
        scale: 0.5, // Start scaled down
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "back.out(2)"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },

    // ➕ Added support for character-based animation with scale-in
    letters: (element, params = {}) => {
      gsap.from($(element).find(".char"), {
        opacity: 0, // Start with 0 opacity
        scale: 0.5, // Start scaled down
        duration: getNumber(params.duration, 1.2),
        ease: (params.ease, "power1.out"),
        stagger: getNumber(params.stagger, 0.05),
        scrollTrigger: params.scrollTrigger,
      });
    },
  },
};
