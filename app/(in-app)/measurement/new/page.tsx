'use client';
import { AppInput, AppSelect } from '@/components/compose';
import { VideoPlayer } from '../_components';
import { Button } from '@/components/ui/button';
export default function MeasurementNewPage() {
  return (
    <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
      <div className="py-4">
        <div className="space-y-6">
          <div>
            <AppSelect
              label="Select Measurement"
              options={[
                { label: 'Vertical Jump', value: 'vertical-jump' },
                { label: 'Broad Jump', value: 'broad-jump' },
                { label: 'Sprint', value: 'sprint' },
                { label: 'Agility', value: 'agility' },
              ]}
              selectedValue="vertical-jump"
              onChangeSelected={value => console.log(value)}
              fullWidth
            />
          </div>

          <VideoPlayer source="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" />

          <div>
            <h3 className="text-gray-700 font-medium mb-2">Instructions:</h3>
            <p className="text-gray-600">
              Stand next to the measurement board. Jump as high as possible and touch the highest
              point you can reach. Measure the distance between your standing reach and jump reach.
            </p>
          </div>

          <div>
            <AppSelect
              label="Select Athlete"
              selectedValue="john-smith"
              options={[
                { label: 'John Smith', value: 'john-smith' },
                { label: 'Sarah Johnson', value: 'sarah-johnson' },
                { label: 'Michael Williams', value: 'michael-williams' },
              ]}
              onChangeSelected={value => console.log(value)}
              fullWidth
            />
          </div>

          <div>
            <AppInput
              label="Record Result"
              inputProps={{ placeholder: 'Enter measurement', type: 'number' }}
              onChange={value => console.log(value)}
              postfix="Unit"
            />
          </div>

          <Button size="lg" className="w-full">
            Save Result
          </Button>
        </div>
      </div>
    </div>
  );
}
