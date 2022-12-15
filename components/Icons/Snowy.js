import React from "react";

export default function Snowy({ little = false }) {
	return (
		<svg
			width={little ? "60" : "120"}
			height={little ? "40" : "90"}
			viewBox='0 0 283 243'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g filter='url(#filter0_bdi_302_58)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M200 176H78V175.989C77.6675 175.996 77.3342 176 77 176C52.1472 176 32 155.853 32 131C32 114.134 41.2787 99.4352 55.0099 91.7296C55.0033 91.3205 55 90.9107 55 90.5C55 49.3548 88.3548 16 129.5 16C164.991 16 194.686 40.8177 202.177 74.0456C229.334 75.186 251 97.5628 251 125C251 151.82 230.297 173.805 204 175.845V176H200Z'
					fill='url(#paint0_radial_302_58)'
					fillOpacity='0.77'
				/>
			</g>
			<g
				style={{ mixBlendMode: "soft-light" }}
				filter='url(#filter1_di_302_58)'>
				<circle cx='77' cy='131' r='45' fill='#848484' />
			</g>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M172.227 209.591C173.106 210.47 174.53 210.47 175.409 209.591C176.288 208.712 176.288 207.288 175.409 206.409L166.25 197.25L176 197.25C177.243 197.25 178.25 196.243 178.25 195C178.25 193.757 177.243 192.75 176 192.75L161.75 192.75L159.25 190.25H161C162.243 190.25 163.25 189.243 163.25 188C163.25 186.757 162.243 185.75 161 185.75L154.75 185.75L147.5 178.5L157.318 178.5L161.409 182.591C162.288 183.47 163.712 183.47 164.591 182.591C165.47 181.712 165.47 180.288 164.591 179.409L163.682 178.5H168.405L178.487 187.665C179.406 188.501 180.829 188.433 181.665 187.514C182.501 186.594 182.433 185.171 181.514 184.335L175.095 178.5L186.75 178.5C187.993 178.5 189 177.493 189 176.25C189 175.007 187.993 174 186.75 174L174.182 174L181.591 166.591C182.47 165.712 182.47 164.288 181.591 163.409C180.712 162.53 179.288 162.53 178.409 163.409L167.818 174H163.182L164.591 172.591C165.47 171.712 165.47 170.288 164.591 169.409C163.712 168.53 162.288 168.53 161.409 169.409L156.818 174L146.364 174L155.043 165.321H161.071C162.314 165.321 163.321 164.314 163.321 163.071C163.321 161.828 162.314 160.821 161.071 160.821L159.543 160.821L161.583 158.781L175.956 158.097C177.198 158.038 178.156 156.983 178.097 155.742C178.038 154.501 176.983 153.543 175.742 153.602L166.313 154.051L175.591 144.773C176.47 143.894 176.47 142.47 175.591 141.591C174.712 140.712 173.288 140.712 172.409 141.591L163.25 150.75V141C163.25 139.757 162.243 138.75 161 138.75C159.757 138.75 158.75 139.757 158.75 141L158.75 155.25L156.25 157.75V156C156.25 154.757 155.243 153.75 154 153.75C152.757 153.75 151.75 154.757 151.75 156L151.75 162.25L144.5 169.5V159.682L148.591 155.591C149.47 154.712 149.47 153.288 148.591 152.409C147.712 151.53 146.288 151.53 145.409 152.409L144.5 153.318V148.595L153.665 138.514C154.501 137.594 154.433 136.171 153.514 135.335C152.594 134.499 151.171 134.567 150.335 135.487L144.5 141.905L144.5 130.25C144.5 129.007 143.493 128 142.25 128C141.007 128 140 129.007 140 130.25L140 142.818L132.591 135.409C131.712 134.53 130.288 134.53 129.409 135.409C128.53 136.288 128.53 137.712 129.409 138.591L140 149.182V153.818L138.591 152.409C137.712 151.53 136.288 151.53 135.409 152.409C134.53 153.288 134.53 154.712 135.409 155.591L140 160.182L140 171L128.321 159.321L128.321 152.929C128.321 151.686 127.314 150.679 126.071 150.679C124.828 150.679 123.821 151.686 123.821 152.929V154.821L121.849 152.849L121.097 137.044C121.038 135.803 119.984 134.844 118.742 134.903C117.501 134.962 116.543 136.017 116.602 137.258L117.119 148.119L111.416 142.416C110.537 141.537 109.113 141.537 108.234 142.416C107.355 143.295 107.355 144.719 108.234 145.598L112.386 149.75L104 149.75C102.757 149.75 101.75 150.757 101.75 152C101.75 153.243 102.757 154.25 104 154.25H116.886L120.386 157.75L119 157.75C117.757 157.75 116.75 158.757 116.75 160C116.75 161.243 117.757 162.25 119 162.25H124.886L136.636 174L121.182 174L115.591 168.409C114.712 167.53 113.288 167.53 112.409 168.409C111.53 169.288 111.53 170.712 112.409 171.591L114.818 174H111.245L99.5136 163.335C98.5941 162.499 97.1711 162.567 96.3352 163.487C95.4993 164.406 95.5671 165.829 96.4865 166.665L104.555 174H96.2501C95.0074 174 94 175.007 94 176.25C94 177.493 95.0074 178.5 96.25 178.5H102.318L96.4091 184.409C95.5304 185.288 95.5304 186.712 96.4091 187.591C97.2877 188.47 98.7124 188.47 99.591 187.591L108.682 178.5H112.323C111.531 179.383 111.56 180.742 112.409 181.591C113.288 182.47 114.712 182.47 115.591 181.591L118.682 178.5L135.5 178.5L125.321 188.679H118.929C117.686 188.679 116.679 189.686 116.679 190.929C116.679 192.172 117.686 193.179 118.929 193.179L120.821 193.179L118.849 195.151L103.044 195.903C101.803 195.962 100.844 197.017 100.903 198.258C100.962 199.499 102.017 200.457 103.258 200.398L114.119 199.881L108.416 205.584C107.537 206.463 107.537 207.887 108.416 208.766C109.295 209.645 110.719 209.645 111.598 208.766L115.75 204.614V213C115.75 214.243 116.757 215.25 118 215.25C119.243 215.25 120.25 214.243 120.25 213L120.25 200.114L123.75 196.614V198C123.75 199.243 124.757 200.25 126 200.25C127.243 200.25 128.25 199.243 128.25 198L128.25 192.114L140 180.364V195.818L134.409 201.409C133.53 202.288 133.53 203.712 134.409 204.591C135.288 205.47 136.712 205.47 137.591 204.591L140 202.182L140 205.755L129.335 217.487C128.499 218.406 128.567 219.829 129.487 220.665C130.406 221.501 131.829 221.433 132.665 220.514L140 212.445V220.75C140 221.993 141.007 223 142.25 223C143.493 223 144.5 221.993 144.5 220.75L144.5 214.682L150.409 220.591C151.288 221.47 152.712 221.47 153.591 220.591C154.47 219.712 154.47 218.288 153.591 217.409L144.5 208.318L144.5 204.677C145.383 205.469 146.742 205.44 147.591 204.591C148.47 203.712 148.47 202.288 147.591 201.409L144.5 198.318L144.5 181.864L151.679 189.043V195.071C151.679 196.314 152.686 197.321 153.929 197.321C155.172 197.321 156.179 196.314 156.179 195.071V193.543L158.219 195.583L158.903 209.956C158.962 211.198 160.017 212.156 161.258 212.097C162.499 212.038 163.457 210.983 163.398 209.742L162.949 200.313L172.227 209.591Z'
				fill='url(#paint1_radial_302_58)'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M244.883 180.561C245.235 180.913 245.805 180.913 246.157 180.561C246.509 180.209 246.509 179.638 246.157 179.286L242.489 175.618H246.394C246.892 175.618 247.295 175.214 247.295 174.717C247.295 174.219 246.892 173.815 246.394 173.815L240.687 173.815L239.685 172.814H240.386C240.884 172.814 241.287 172.41 241.287 171.913C241.287 171.415 240.884 171.012 240.386 171.012H237.883L234.979 168.108L238.911 168.108L240.55 169.746C240.902 170.098 241.473 170.098 241.824 169.746C242.176 169.394 242.176 168.824 241.824 168.472L241.46 168.108H243.352L247.39 171.779C247.758 172.113 248.328 172.086 248.663 171.718C248.998 171.35 248.971 170.78 248.603 170.445L246.032 168.108L250.7 168.108C251.198 168.108 251.601 167.704 251.601 167.206C251.601 166.709 251.198 166.305 250.7 166.305L245.666 166.305L248.634 163.338C248.985 162.986 248.985 162.415 248.634 162.063C248.282 161.711 247.711 161.711 247.359 162.063L243.117 166.305H241.26L241.824 165.741C242.176 165.389 242.176 164.818 241.824 164.466C241.473 164.114 240.902 164.114 240.55 164.466L238.711 166.305H234.524L238 162.829L240.415 162.829C240.912 162.829 241.316 162.426 241.316 161.928C241.316 161.43 240.912 161.027 240.415 161.027H239.802L240.62 160.21L246.377 159.935C246.874 159.912 247.258 159.49 247.234 158.992C247.21 158.495 246.788 158.111 246.291 158.135L242.514 158.315L246.23 154.599C246.582 154.247 246.582 153.676 246.23 153.324C245.878 152.972 245.308 152.972 244.956 153.324L241.287 156.993L241.287 153.088C241.287 152.59 240.884 152.186 240.386 152.186C239.888 152.186 239.485 152.59 239.485 153.088L239.485 158.795L238.484 159.797V159.096C238.484 158.598 238.08 158.194 237.582 158.194C237.085 158.194 236.681 158.598 236.681 159.096V161.599L233.777 164.503L233.777 160.57L235.416 158.932C235.768 158.58 235.768 158.009 235.416 157.657C235.064 157.305 234.493 157.305 234.141 157.657L233.777 158.021V156.13L237.448 152.092C237.783 151.723 237.756 151.153 237.388 150.819C237.019 150.484 236.449 150.511 236.114 150.879L233.777 153.45L233.777 148.782C233.777 148.284 233.374 147.881 232.876 147.881C232.378 147.881 231.975 148.284 231.975 148.782L231.975 153.816L229.007 150.848C228.655 150.496 228.085 150.496 227.733 150.848C227.381 151.2 227.381 151.771 227.733 152.123L231.975 156.365V158.222L231.411 157.657C231.059 157.305 230.488 157.305 230.136 157.657C229.784 158.009 229.784 158.58 230.136 158.932L231.975 160.771L231.975 165.104L227.297 160.426L227.297 157.866C227.297 157.368 226.894 156.964 226.396 156.964C225.898 156.964 225.495 157.368 225.495 157.866V158.623L224.705 157.834L224.403 151.503C224.38 151.006 223.958 150.622 223.46 150.646C222.963 150.669 222.579 151.092 222.603 151.589L222.81 155.939L220.526 153.655C220.174 153.303 219.603 153.303 219.251 153.655C218.899 154.007 218.899 154.577 219.251 154.929L220.915 156.592L217.556 156.592C217.058 156.592 216.654 156.996 216.654 157.493C216.654 157.991 217.058 158.395 217.556 158.395L222.717 158.395L224.119 159.797H223.564C223.066 159.797 222.662 160.2 222.662 160.698C222.662 161.195 223.066 161.599 223.564 161.599L225.921 161.599L230.628 166.305L224.438 166.305L222.198 164.066C221.846 163.714 221.276 163.714 220.924 164.066C220.572 164.418 220.572 164.988 220.924 165.34L221.889 166.305H220.457L215.759 162.034C215.39 161.699 214.82 161.726 214.486 162.094C214.151 162.463 214.178 163.032 214.546 163.367L217.778 166.305L214.451 166.305C213.954 166.305 213.55 166.709 213.55 167.206C213.55 167.704 213.954 168.108 214.451 168.108L216.882 168.108L214.515 170.474C214.163 170.826 214.163 171.397 214.515 171.749C214.867 172.101 215.438 172.101 215.79 171.749L219.431 168.108L220.889 168.108C220.572 168.462 220.584 169.006 220.924 169.346C221.276 169.698 221.846 169.698 222.198 169.346L223.436 168.108H230.172L226.095 172.185L223.535 172.185C223.037 172.185 222.634 172.588 222.634 173.086C222.634 173.584 223.037 173.987 223.535 173.987H224.293L223.503 174.777L217.173 175.078C216.675 175.102 216.292 175.524 216.315 176.021C216.339 176.519 216.761 176.902 217.258 176.879L221.609 176.672L219.324 178.956C218.972 179.308 218.972 179.878 219.324 180.23C219.676 180.582 220.247 180.582 220.599 180.23L222.262 178.567L222.262 181.926C222.262 182.424 222.665 182.827 223.163 182.827C223.661 182.827 224.064 182.424 224.064 181.926L224.064 176.765L225.466 175.363V175.918C225.466 176.416 225.87 176.819 226.367 176.819C226.865 176.819 227.269 176.416 227.269 175.918L227.269 173.561L231.975 168.854V175.044L229.735 177.284C229.384 177.635 229.384 178.206 229.735 178.558C230.087 178.91 230.658 178.91 231.01 178.558L231.975 177.593V179.024L227.703 183.723C227.368 184.091 227.396 184.661 227.764 184.996C228.132 185.331 228.702 185.304 229.037 184.936L231.975 181.704L231.975 185.03C231.975 185.528 232.378 185.931 232.876 185.931C233.374 185.931 233.777 185.528 233.777 185.03L233.777 182.6L236.144 184.967C236.496 185.319 237.067 185.319 237.419 184.967C237.77 184.615 237.77 184.044 237.419 183.692L233.777 180.051V178.593C234.131 178.91 234.675 178.898 235.015 178.558C235.367 178.206 235.367 177.635 235.015 177.284L233.777 176.045V169.455L236.653 172.33V174.745C236.653 175.243 237.056 175.646 237.554 175.646C238.052 175.646 238.455 175.243 238.455 174.745V174.133L239.272 174.95L239.546 180.707C239.57 181.204 239.992 181.588 240.489 181.564C240.987 181.541 241.37 181.118 241.347 180.621L241.167 176.845L244.883 180.561Z'
				fill='url(#paint2_radial_302_58)'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M58.6692 107.444C59.0415 107.816 59.6451 107.816 60.0173 107.444C60.3896 107.072 60.3896 106.468 60.0173 106.096L56.1368 102.215L60.2677 102.215C60.7942 102.215 61.221 101.788 61.221 101.262C61.221 100.735 60.7942 100.309 60.2677 100.309L54.2302 100.309L53.171 99.2494H53.9124C54.4389 99.2494 54.8657 98.8226 54.8657 98.2961C54.8657 97.7696 54.4389 97.3428 53.9124 97.3428L51.2644 97.3428L48.1926 94.2711L52.3524 94.2711L54.0857 96.0044C54.458 96.3766 55.0616 96.3766 55.4339 96.0044C55.8062 95.6321 55.8062 95.0285 55.4339 94.6562L55.0488 94.2711H57.0499L61.3212 98.1541C61.7108 98.5082 62.3137 98.4795 62.6679 98.09C63.022 97.7004 62.9933 97.0975 62.6037 96.7433L59.8843 94.2711L64.8224 94.2711C65.3489 94.2711 65.7757 93.8443 65.7757 93.3178C65.7757 92.7913 65.3489 92.3645 64.8224 92.3645H59.4975L62.6366 89.2253C63.0089 88.8531 63.0089 88.2495 62.6366 87.8772C62.2643 87.5049 61.6607 87.5049 61.2884 87.8772L56.8011 92.3645H54.8369L55.4339 91.7675C55.8062 91.3952 55.8062 90.7916 55.4339 90.4193C55.0616 90.047 54.458 90.047 54.0857 90.4193L52.1406 92.3645H47.7113L51.3885 88.6873H53.9425C54.469 88.6873 54.8958 88.2605 54.8958 87.734C54.8958 87.2075 54.469 86.7807 53.9425 86.7807L53.2951 86.7807L54.1594 85.9164L60.2492 85.6264C60.7751 85.6014 61.1811 85.1547 61.1561 84.6289C61.131 84.103 60.6844 83.6969 60.1585 83.722L56.1636 83.9122L60.0944 79.9813C60.4667 79.609 60.4667 79.0054 60.0944 78.6332C59.7222 78.2609 59.1186 78.2609 58.7463 78.6332L54.8657 82.5137L54.8657 78.3828C54.8657 77.8563 54.4389 77.4295 53.9124 77.4295C53.3859 77.4295 52.9591 77.8563 52.9591 78.3828V84.4203L51.8999 85.4795V84.7381C51.8999 84.2116 51.4731 83.7848 50.9466 83.7848C50.4201 83.7848 49.9933 84.2116 49.9933 84.7381L49.9933 87.3861L46.9216 90.4579L46.9216 86.2981L48.6549 84.5648C49.0272 84.1925 49.0272 83.5889 48.6549 83.2166C48.2826 82.8443 47.679 82.8443 47.3067 83.2166L46.9216 83.6017V81.6006L50.8046 77.3293C51.1588 76.9397 51.1301 76.3368 50.7405 75.9826C50.3509 75.6285 49.748 75.6572 49.3938 76.0468L46.9216 78.7663L46.9216 73.8281C46.9216 73.3016 46.4948 72.8748 45.9683 72.8748C45.4418 72.8748 45.015 73.3016 45.015 73.8281L45.015 79.1531L41.8759 76.0139C41.5036 75.6417 40.9 75.6417 40.5277 76.0139C40.1554 76.3862 40.1554 76.9898 40.5277 77.3621L45.015 81.8494V83.8136L44.418 83.2166C44.0457 82.8443 43.4421 82.8443 43.0698 83.2166C42.6975 83.5889 42.6975 84.1925 43.0698 84.5648L45.015 86.5099V91.0934L40.0668 86.1452V83.4369C40.0668 82.9104 39.6399 82.4836 39.1135 82.4836C38.587 82.4836 38.1602 82.9104 38.1602 83.4369V84.2386L37.3248 83.4032L37.0059 76.7065C36.9808 76.1806 36.5342 75.7746 36.0083 75.7997C35.4824 75.8247 35.0764 76.2713 35.1014 76.7972L35.3206 81.399L32.9042 78.9826C32.5319 78.6104 31.9283 78.6104 31.556 78.9827C31.1838 79.3549 31.1838 79.9585 31.556 80.3308L33.3152 82.09H29.7622C29.2357 82.09 28.8089 82.5168 28.8089 83.0433C28.8089 83.5698 29.2357 83.9966 29.7622 83.9966L35.2218 83.9966L36.7047 85.4795L36.1175 85.4795C35.591 85.4795 35.1642 85.9063 35.1642 86.4328C35.1642 86.9593 35.591 87.3861 36.1175 87.3861H38.6113L43.5897 92.3645L37.042 92.3645L34.6732 89.9956C34.3009 89.6233 33.6973 89.6233 33.325 89.9956C32.9527 90.3679 32.9527 90.9715 33.325 91.3438L34.3457 92.3645H32.8318L27.8613 87.8459C27.4718 87.4917 26.8689 87.5205 26.5147 87.91C26.1605 88.2996 26.1893 88.9025 26.5788 89.2567L29.9974 92.3645H26.4786C25.9522 92.3645 25.5253 92.7913 25.5253 93.3178C25.5253 93.8443 25.9522 94.2711 26.4786 94.2711L29.0496 94.2711L26.546 96.7746C26.1737 97.1469 26.1737 97.7505 26.546 98.1228C26.9183 98.4951 27.5219 98.4951 27.8942 98.1228L31.7459 94.2711H33.2885C32.9531 94.6454 32.9653 95.221 33.325 95.5807C33.6973 95.953 34.3009 95.953 34.6732 95.5807L35.9828 94.2711L43.1084 94.2711L38.7957 98.5838H36.0874C35.5609 98.5838 35.1341 99.0106 35.1341 99.5371C35.1341 100.064 35.5609 100.49 36.0874 100.49H36.8891L36.0537 101.326L29.357 101.645C28.8312 101.67 28.4251 102.116 28.4502 102.642C28.4752 103.168 28.9218 103.574 29.4477 103.549L34.0495 103.33L31.6331 105.746C31.2609 106.119 31.2609 106.722 31.6331 107.094C32.0054 107.467 32.609 107.467 32.9813 107.094L34.7405 105.335V108.888C34.7405 109.415 35.1673 109.842 35.6938 109.842C36.2203 109.842 36.6471 109.415 36.6471 108.888L36.6471 103.429L38.13 101.946L38.13 102.533C38.13 103.059 38.5568 103.486 39.0833 103.486C39.6098 103.486 40.0366 103.059 40.0366 102.533V100.039L45.015 95.0608L45.015 101.608L42.6461 103.977C42.2739 104.35 42.2739 104.953 42.6461 105.325C43.0184 105.698 43.622 105.698 43.9943 105.325L45.015 104.305V105.819L40.4964 110.789C40.1422 111.179 40.171 111.782 40.5605 112.136C40.9501 112.49 41.553 112.461 41.9072 112.072L45.015 108.653L45.015 112.172C45.015 112.698 45.4418 113.125 45.9683 113.125C46.4948 113.125 46.9216 112.698 46.9216 112.172L46.9216 109.601L49.4251 112.104C49.7974 112.477 50.401 112.477 50.7733 112.104C51.1456 111.732 51.1456 111.129 50.7733 110.756L46.9216 106.905L46.9216 105.362C47.2959 105.697 47.8715 105.685 48.2312 105.325C48.6035 104.953 48.6035 104.35 48.2312 103.977L46.9216 102.668L46.9216 95.6964L49.9632 98.738L49.9632 101.292C49.9632 101.819 50.39 102.245 50.9165 102.245C51.443 102.245 51.8698 101.819 51.8698 101.292L51.8698 100.645L52.7341 101.509L53.0241 107.599C53.0491 108.125 53.4957 108.531 54.0216 108.506C54.5475 108.481 54.9536 108.034 54.9285 107.508L54.7383 103.513L58.6692 107.444Z'
				fill='url(#paint3_radial_302_58)'
			/>
			<defs>
				<filter
					id='filter0_bdi_302_58'
					x='-1.52588e-05'
					y='0'
					width='283'
					height='224'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feGaussianBlur in='BackgroundImageFix' stdDeviation='8' />
					<feComposite
						in2='SourceAlpha'
						operator='in'
						result='effect1_backgroundBlur_302_58'
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
						values='0 0 0 0 0.0313726 0 0 0 0 0.129412 0 0 0 0 0.219608 0 0 0 0.2 0'
					/>
					<feBlend
						mode='normal'
						in2='effect1_backgroundBlur_302_58'
						result='effect2_dropShadow_302_58'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect2_dropShadow_302_58'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dx='1' dy='2' />
					<feGaussianBlur stdDeviation='7' />
					<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0.0761458 0 0 0 0 0.185885 0 0 0 0 0.358333 0 0 0 1 0'
					/>
					<feBlend
						mode='normal'
						in2='shape'
						result='effect3_innerShadow_302_58'
					/>
				</filter>
				<filter
					id='filter1_di_302_58'
					x='24'
					y='70'
					width='120'
					height='118'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'>
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
						result='effect1_dropShadow_302_58'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_302_58'
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
						result='effect2_innerShadow_302_58'
					/>
				</filter>
				<radialGradient
					id='paint0_radial_302_58'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(109.164 50.1144) rotate(90.6693) scale(125.829 143.587)'>
					<stop offset='0.015625' stop-color='#27364E' />
					<stop offset='1' />
				</radialGradient>
				<radialGradient
					id='paint1_radial_302_58'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(142 173) rotate(90) scale(49 98)'>
					<stop stop-color='#7FDFF4' />
					<stop offset='1' stop-color='#0C43BF' />
				</radialGradient>
				<radialGradient
					id='paint2_radial_302_58'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(232.776 165.905) rotate(90) scale(19.6262 39.2525)'>
					<stop stop-color='#7FDFF4' />
					<stop offset='1' stop-color='#0C43BF' />
				</radialGradient>
				<radialGradient
					id='paint3_radial_302_58'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(45.8624 91.9408) rotate(90) scale(20.7607 41.5214)'>
					<stop stop-color='#7FDFF4' />
					<stop offset='1' stop-color='#0C43BF' />
				</radialGradient>
			</defs>
		</svg>
	);
}