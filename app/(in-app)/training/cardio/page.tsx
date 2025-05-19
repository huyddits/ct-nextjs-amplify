'use client';
import { Info } from 'lucide-react';
import { AppInput, AppSelect } from '@/components/compose';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CardioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-[56px] pb-[80px] max-w-3xl mx-auto px-4">
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Cardio Training Selection</h2>
              <Info className="h-5 w-5 text-gray-400" />
            </div>
            <div>
              <AppSelect
                options={[
                  { label: 'Bike', value: 'bike' },
                  { label: 'Run', value: 'run' },
                  { label: 'Swim', value: 'swim' },
                ]}
                selectedValue="bike"
                onChangeSelected={value => console.log(value)}
                fullWidth
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Intervals</h2>
              <Button variant="outline" className="text-[#257951]">
                + Add
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <AppInput
                  label="Duration (min)"
                  inputProps={{ placeholder: '5', type: 'number' }}
                  onChange={value => console.log(value)}
                  className=" text-sm text-gray-600"
                />
              </div>

              <div className="space-y-2 ">
                <AppSelect
                  label="RPE (0-10)"
                  options={[...Array(11)].map((_, i) => ({
                    label: i.toString(),
                    value: i.toString(),
                  }))}
                  selectedValue="0"
                  onChangeSelected={value => console.log('Selected RPE:', value)}
                  className=" text-sm text-gray-600 w-24"
                />
              </div>

              <div className="space-y-2">
                <AppInput
                  label="Distance"
                  inputProps={{ placeholder: '0.0', type: 'number' }}
                  onChange={value => console.log(value)}
                  className=" text-sm text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <AppSelect
                  label="Unit"
                  options={[
                    { label: 'Miles', value: 'miles' },
                    { label: 'Kilometers', value: 'km' },
                  ]}
                  selectedValue="miles"
                  onChangeSelected={value => console.log(value)}
                  className=" text-sm text-gray-600 w-24"
                />
                <div></div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm text-gray-600 ">Heart Rate Range (BPM)</label>
                <div className="flex items-center gap-2">
                  <AppInput
                    inputProps={{
                      type: 'number',
                      placeholder: '140',
                      'aria-label': 'Minimum heart rate',
                    }}
                    onChange={value => console.log('Min HR:', value)}
                    className="w-full"
                  />
                  <span className="text-gray-500">-</span>
                  <AppInput
                    inputProps={{
                      type: 'number',
                      placeholder: '160',
                      'aria-label': 'Maximum heart rate',
                    }}
                    onChange={value => console.log('Max HR:', value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Notes</label>
              <Textarea
                placeholder="Add any notes about this interval..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button className="w-full" size="lg">
            Complete Workout
          </Button>

          <div className="h-6"></div>

          <Button className="w-full" size="lg">
            Past Cardio Training
          </Button>
        </div>
      </div>
    </div>
  );
}
