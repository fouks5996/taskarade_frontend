import React from "react";

export default function NightCloudyIcon({ little = false }) {
	return (
		<>
			<svg
				width={little ? "50" : "90"}
				height={little ? "40" : "80"}
				viewBox='0 0 292 277'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<>
					<g filter={"url(#filter0_i_302_129)"}>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M292 119.065C283.079 123.115 273.174 125.37 262.743 125.37C223.546 125.37 191.77 93.5269 191.77 54.2466C191.77 32.6482 201.377 13.2984 216.542 0.254458C214.322 0.0858437 212.078 0 209.814 0C161.316 0 122 39.3989 122 88C122 136.601 161.316 176 209.814 176C247.4 176 279.471 152.336 292 119.065Z'
							fill='#4107E7'
						/>
					</g>
					<g filter={"url(#filter1_bdi_302_129)"}>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M200 229H78V228.989C77.6675 228.996 77.3342 229 77 229C52.1472 229 32 208.853 32 184C32 167.134 41.2787 152.435 55.0099 144.73C55.0033 144.321 55 143.911 55 143.5C55 102.355 88.3548 69 129.5 69C164.991 69 194.686 93.8177 202.177 127.046C229.334 128.186 251 150.563 251 178C251 204.82 230.297 226.805 204 228.845V229H200Z'
							fill='url(#paint0_radial_302_129)'
							fillOpacity='0.77'
						/>
					</g>
					<g
						style={{ mixBlendMode: "soft-light" }}
						filter={"url(#filter2_di_302_129)"}>
						<circle cx='77' cy='184' r='45' fill='#848484' />
					</g>
				</>

				<defs>
					<filter
						id='filter0_i_302_129'
						x='112'
						y='0'
						width='180'
						height='189'
						filterUnits='userSpaceOnUse'
						interpolationfilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='BackgroundImageFix'
							result='shape'
						/>
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dx='-10' dy='13' />
						<feGaussianBlur stdDeviation='12' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 0.98 0 0 0 0 0 0 0 0 0 1 0 0 0 0.9 0'
						/>
						<feBlend
							mode='normal'
							in2='shape'
							result='effect1_innerShadow_302_129'
						/>
					</filter>
					<filter
						id='filter1_bdi_302_129'
						x='0'
						y='53'
						width='283'
						height='224'
						filterUnits='userSpaceOnUse'
						interpolationfilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feGaussianBlur in='BackgroundImageFix' stdDeviation='8' />
						<feComposite
							in2='SourceAlpha'
							operator='in'
							result='effect1_backgroundBlur_302_129'
						/>
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dy='16' />
						<feGaussianBlur stdDeviation='16' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 0.385412 0 0 0 0 0.0627451 0 0 0 0 0.796078 0 0 0 0.12 0'
						/>
						<feBlend
							mode='normal'
							in2='effect1_backgroundBlur_302_129'
							result='effect2_dropShadow_302_129'
						/>
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect2_dropShadow_302_129'
							result='shape'
						/>
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dx='-2' dy='2' />
						<feGaussianBlur stdDeviation='7' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 0.209569 0 0 0 0 0.0630035 0 0 0 0 0.795833 0 0 0 0.3 0'
						/>
						<feBlend
							mode='normal'
							in2='shape'
							result='effect3_innerShadow_302_129'
						/>
					</filter>
					<filter
						id='filter2_di_302_129'
						x='24'
						y='123'
						width='120'
						height='118'
						filterUnits='userSpaceOnUse'
						interpolationfilters='sRGB'>
						<feFlood floodOpacity='0' result='BackgroundImageFix' />
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dx='-2' dy='-10' />
						<feGaussianBlur stdDeviation='3' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.22 0'
						/>
						<feBlend
							mode='normal'
							in2='BackgroundImageFix'
							result='effect1_dropShadow_302_129'
						/>
						<feBlend
							mode='normal'
							in='SourceGraphic'
							in2='effect1_dropShadow_302_129'
							result='shape'
						/>
						<feColorMatrix
							in='SourceAlpha'
							type='matrix'
							values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
							result='hardAlpha'
						/>
						<feOffset dx='22' dy='12' />
						<feGaussianBlur stdDeviation='11' />
						<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
						<feColorMatrix
							type='matrix'
							values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.74 0'
						/>
						<feBlend
							mode='normal'
							in2='shape'
							result='effect2_innerShadow_302_129'
						/>
					</filter>
					<radialGradient
						id='paint0_radial_302_129'
						cx='0'
						cy='0'
						r='1'
						gradientUnits='userSpaceOnUse'
						gradientTransform='translate(109.164 103.114) rotate(90.6693) scale(125.829 143.587)'>
						<stop offset='0.015625' stopColor='#31187A' />
						<stop offset='1' stopColor='#07020A' />
					</radialGradient>
				</defs>
			</svg>
		</>
	);
}
