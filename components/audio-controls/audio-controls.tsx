import { FaStop } from 'react-icons/fa';
import { FaVolumeHigh, FaVolumeLow } from 'react-icons/fa6';

type ControlsProps = {
  volume: number;
  onVolumeChange: (delta: number) => void;
  rate: number;
  onRateChange: (delta: number) => void;
  onStop: () => void;
};

export default function AudioControls({
  volume,
  onVolumeChange,
  rate,
  onRateChange,
  onStop,
}: ControlsProps) {
  return (
    <table className="mx-auto border-collapse border-l border-[#73748C80] text-sm">
      <tbody>
        <tr>
          <td className="px-2">
            <button onClick={() => onVolumeChange(-0.1)} title="Volume Down">
              <FaVolumeLow />
            </button>
          </td>
          <td className="px-2 text-center">{Math.round(volume * 100)}%</td>
          <td className="px-2">
            <button onClick={() => onVolumeChange(0.1)} title="Volume Up">
              <FaVolumeHigh />
            </button>
          </td>
        </tr>

        <tr className="border-t border-[#73748C80]">
          <td className="px-2">
            <button onClick={() => onRateChange(-0.25)} title="Slower">
              −
            </button>
          </td>
          <td className="px-2 text-center">{rate.toFixed(2)}x</td>
          <td className="px-2">
            <button onClick={() => onRateChange(0.25)} title="Faster">
              +
            </button>
          </td>
        </tr>

        <tr className="border-t border-[#73748C80]">
          <td colSpan={3} className="px-2">
            <button
              onClick={onStop}
              title="Stop"
              className="mt-1 inline-flex items-center justify-center space-x-3"
            >
              <FaStop />
              <span>STOP</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
