import React from "react";
import "./layout.scss";

export default function AdminHeader({ onToggleSidebar }) {

  return (
    <div className="headerSection">
      <div className="headerLeft">
        <div className="toggleBtn" onClick={onToggleSidebar}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5" clipPath="url(#clip0_63_8227)">
              <path
                d="M0.666667 3.16662H2.49067C2.63376 3.69311 2.94612 4.15789 3.37955 4.48924C3.81299 4.8206 4.34341 5.00013 4.889 5.00013C5.43459 5.00013 5.96501 4.8206 6.39845 4.48924C6.83188 4.15789 7.14424 3.69311 7.28733 3.16662H15.3333C15.5101 3.16662 15.6797 3.09639 15.8047 2.97136C15.9298 2.84634 16 2.67677 16 2.49996C16 2.32315 15.9298 2.15358 15.8047 2.02855C15.6797 1.90353 15.5101 1.83329 15.3333 1.83329H7.28733C7.14424 1.3068 6.83188 0.842028 6.39845 0.51067C5.96501 0.179312 5.43459 -0.00021553 4.889 -0.00021553C4.34341 -0.00021553 3.81299 0.179312 3.37955 0.51067C2.94612 0.842028 2.63376 1.3068 2.49067 1.83329H0.666667C0.489856 1.83329 0.320286 1.90353 0.195262 2.02855C0.0702379 2.15358 0 2.32315 0 2.49996C0 2.67677 0.0702379 2.84634 0.195262 2.97136C0.320286 3.09639 0.489856 3.16662 0.666667 3.16662ZM4.88867 1.33329C5.11941 1.33329 5.34497 1.40171 5.53683 1.52991C5.72869 1.6581 5.87822 1.84031 5.96653 2.05349C6.05483 2.26667 6.07793 2.50125 6.03292 2.72756C5.9879 2.95387 5.87679 3.16175 5.71362 3.32491C5.55046 3.48808 5.34258 3.59919 5.11627 3.64421C4.88996 3.68922 4.65538 3.66612 4.4422 3.57782C4.22902 3.48951 4.04681 3.33998 3.91862 3.14812C3.79042 2.95627 3.722 2.7307 3.722 2.49996C3.72235 2.19065 3.84538 1.8941 4.0641 1.67539C4.28281 1.45667 4.57936 1.33364 4.88867 1.33329Z"
                fill="black"
              />
              <path
                d="M15.3333 7.33333H13.5093C13.3665 6.80672 13.0542 6.34178 12.6208 6.01028C12.1874 5.67879 11.657 5.49918 11.1113 5.49918C10.5657 5.49918 10.0352 5.67879 9.60182 6.01028C9.16842 6.34178 8.85619 6.80672 8.71333 7.33333H0.666667C0.489856 7.33333 0.320286 7.40357 0.195262 7.52859C0.0702379 7.65362 0 7.82319 0 8C0 8.17681 0.0702379 8.34638 0.195262 8.4714C0.320286 8.59643 0.489856 8.66667 0.666667 8.66667H8.71333C8.85619 9.19328 9.16842 9.65822 9.60182 9.98971C10.0352 10.3212 10.5657 10.5008 11.1113 10.5008C11.657 10.5008 12.1874 10.3212 12.6208 9.98971C13.0542 9.65822 13.3665 9.19328 13.5093 8.66667H15.3333C15.5101 8.66667 15.6797 8.59643 15.8047 8.4714C15.9298 8.34638 16 8.17681 16 8C16 7.82319 15.9298 7.65362 15.8047 7.52859C15.6797 7.40357 15.5101 7.33333 15.3333 7.33333ZM11.1113 9.16667C10.8806 9.16667 10.655 9.09824 10.4632 8.97005C10.2713 8.84185 10.1218 8.65964 10.0335 8.44646C9.94517 8.23328 9.92207 7.9987 9.96708 7.77239C10.0121 7.54608 10.1232 7.3382 10.2864 7.17504C10.4495 7.01188 10.6574 6.90077 10.8837 6.85575C11.11 6.81073 11.3446 6.83384 11.5578 6.92214C11.771 7.01044 11.9532 7.15998 12.0814 7.35183C12.2096 7.54369 12.278 7.76925 12.278 8C12.2776 8.30931 12.1546 8.60585 11.9359 8.82457C11.7172 9.04328 11.4206 9.16631 11.1113 9.16667Z"
                fill="black"
              />
              <path
                d="M15.3333 12.8333H7.28733C7.14424 12.3068 6.83188 11.8421 6.39845 11.5107C5.96501 11.1794 5.43459 10.9998 4.889 10.9998C4.34341 10.9998 3.81299 11.1794 3.37955 11.5107C2.94612 11.8421 2.63376 12.3068 2.49067 12.8333H0.666667C0.489856 12.8333 0.320286 12.9036 0.195262 13.0286C0.0702379 13.1536 0 13.3232 0 13.5C0 13.6768 0.0702379 13.8464 0.195262 13.9714C0.320286 14.0964 0.489856 14.1667 0.666667 14.1667H2.49067C2.63376 14.6932 2.94612 15.1579 3.37955 15.4893C3.81299 15.8206 4.34341 16.0002 4.889 16.0002C5.43459 16.0002 5.96501 15.8206 6.39845 15.4893C6.83188 15.1579 7.14424 14.6932 7.28733 14.1667H15.3333C15.5101 14.1667 15.6797 14.0964 15.8047 13.9714C15.9298 13.8464 16 13.6768 16 13.5C16 13.3232 15.9298 13.1536 15.8047 13.0286C15.6797 12.9036 15.5101 12.8333 15.3333 12.8333ZM4.88867 14.6667C4.65792 14.6667 4.43236 14.5982 4.2405 14.47C4.04864 14.3419 3.89911 14.1596 3.81081 13.9465C3.72251 13.7333 3.6994 13.4987 3.74442 13.2724C3.78943 13.0461 3.90055 12.8382 4.06371 12.675C4.22687 12.5119 4.43475 12.4008 4.66106 12.3558C4.88737 12.3107 5.12195 12.3338 5.33513 12.4221C5.54831 12.5104 5.73052 12.66 5.85871 12.8518C5.98691 13.0437 6.05533 13.2693 6.05533 13.5C6.0548 13.8093 5.93172 14.1057 5.71304 14.3244C5.49436 14.5431 5.19792 14.6661 4.88867 14.6667Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_63_8227">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
